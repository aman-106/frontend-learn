axios.head(url[, config])


HTTP/1.1 200 OK
…
Accept-Ranges: bytes
Content-Length: 146515


In this response, Accept-Ranges: bytes indicates that bytes can be used as units to define a range. Here the Content-Length header is also useful as it indicates the full size of the image to retrieve.

HTTP/1.1 200 OK
…
Accept-Ranges: none

Range - 

curl http://i.imgur.com/z4d4kWk.jpg -i -H "Range: bytes=0-1023"

HTTP/1.1 206 Partial Content
Content-Range: bytes 0-1023/146515
Content-Length: 1024

here are three relevant statuses, when working with range requests:

A successful range request elicits a 206 Partial Content status from the server.
A range request that is out of bounds will result in a 416 Requested Range Not Satisfiable status, meaning that none of the range values overlap the extent of the resource. For example, the first-byte-pos of every range might be greater than the resource length.
If range requests are not supported, an 200 OK status is sent back and the entire response body is transmitted.

// parallel-file.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as yauzl from 'yauzl';
import * as fs from 'fs-extra';

@Injectable()
export class ParallelFileService {
  async downloadUnzipParallelFile(url: string, outputPath: string, numChunks: number = 4): Promise<void> {
    // Initialize an array to store promises for downloading chunks
    const downloadPromises = [];

    // Create an array to store the downloaded chunks
    const downloadedChunks = new Array(numChunks);

    // Calculate chunk size
    const chunkSize = Math.floor(100 / numChunks);

    // Download file in parallel
    for (let i = 0; i < numChunks; i++) {
      const startByte = i * chunkSize;
      const endByte = (i + 1) * chunkSize - 1;
      downloadPromises.push(this.downloadChunk(url, startByte, endByte, i, downloadedChunks));
    }

    // Wait for all chunks to be downloaded
    await Promise.all(downloadPromises);

    // Sort and write the downloaded chunks to the output file
    downloadedChunks.sort((a, b) => a.index - b.index);
    const concatenatedData = Buffer.concat(downloadedChunks.map((chunk) => chunk.data));
    fs.writeFileSync(outputPath, concatenatedData);

    // Unzip the downloaded file
    await this.unzipFile(outputPath);
  }

  private async downloadChunk(url: string, startByte: number, endByte: number, index: number, downloadedChunks: any[]): Promise<void> {
    const headers = {
      Range: `bytes=${startByte}-${endByte}`,
    };

    return axios
      .get(url, { headers, responseType: 'arraybuffer' })
      .then((response) => {
        return new Promise<void>((resolve, reject) => {
          downloadedChunks[index] = { index, data: new Uint8Array(response.data) };
          resolve();
        });
      })
      .catch((error) => {
        throw error;
      });
  }

  private async unzipFile(zipFilePath: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      yauzl.open(zipFilePath, { autoClose: true, lazyEntries: true }, (err, zipfile) => {
        if (err) {
          reject(err);
          return;
        }

        zipfile.readEntry();
        zipfile.on('entry', (entry) => {
          if (/\/$/.test(entry.fileName)) {
            // Directory entry, create the directory if it doesn't exist
            fs.ensureDirSync(entry.fileName);
            zipfile.readEntry();
          } else {
            // File entry, extract it
            zipfile.openReadStream(entry, (err, readStream) => {
              if (err) {
                reject(err);
                return;
              }
              readStream.pipe(fs.createWriteStream(entry.fileName));
              readStream.on('end', () => {
                zipfile.readEntry();
              });
            });
          }
        });

        zipfile.on('end', () => {
          resolve();
        });
      });
    });
  }
}


However, it's important to handle errors and edge cases gracefully to ensure that any potential issues, such as network interruptions or partial downloads, are properly managed. You may want to implement error handling and validation to confirm that all chunks have been successfully downloaded and written before proceeding with the file extraction or further processing.
