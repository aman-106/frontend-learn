Creating a Single Page Application (SPA) in React and hosting it on AWS using CloudFront, Route 53, and S3 involves several steps. Here's a high-level overview of the process:

1. **Create a React SPA**:

   Start by creating your React SPA. You can use Create React App or any other method to build your application.

2. **Build Your React App**:

   Build your React app for production using the following command:

   ```bash
   npm run build
   ```

   This will create a `build` directory containing your optimized app.

3. **Set Up an S3 Bucket**:

   You need an S3 bucket to host your React app. Follow these steps:

   a. Log in to the AWS Management Console.

   b. Open the Amazon S3 service and create a new S3 bucket. Give it a unique name and configure the settings as needed.

   c. Upload the contents of your React app's `build` directory to the S3 bucket.

   d. Make the objects in your S3 bucket publicly accessible. You can do this by selecting the objects in the bucket and adjusting their permissions.

4. **Configure Static Website Hosting**:

   Enable static website hosting on your S3 bucket by:

   a. Going to the Properties tab of your S3 bucket.

   b. In the "Static website hosting" section, select "Use this bucket to host a website."

   c. Enter the index document (usually "index.html") and an optional error document (e.g., "index.html").

   Save your changes.

5. **Set Up CloudFront Distribution**:

   Create a CloudFront distribution to serve your website content. This enables content delivery with low latency and high data transfer speeds.

   a. Open the Amazon CloudFront service in the AWS Management Console.

   b. Create a new distribution and specify your S3 bucket as the origin.

   c. Configure the distribution settings, such as the default cache behavior.

   d. Once the distribution is created, note the CloudFront domain name (e.g., dxxxxxxxxxxxx.cloudfront.net).

6. **Set Up Route 53**:

   If you want to use a custom domain name (e.g., www.yourdomain.com), follow these steps to set up Route 53:

   a. Open the Route 53 service in the AWS Management Console.

   b. Create a hosted zone for your domain.

   c. Create a new record set for your domain, and select "Alias" as the routing type.

   d. Choose your CloudFront distribution as the target.

7. **Update DNS Settings**:

   Update the DNS settings of your domain registrar to point to the Route 53 name servers. This may vary depending on your registrar.

8. **Testing**:

   It may take some time for DNS changes to propagate. After that, you should be able to access your React SPA using your custom domain.

9. **HTTPS** (optional):

   You can configure an SSL certificate for your CloudFront distribution to enable HTTPS. AWS provides a service called ACM (AWS Certificate Manager) for this purpose.

10. **Caching and Security**:

    Consider implementing security measures, such as setting up appropriate security policies and caching strategies for your CloudFront distribution, as well as configuring S3 bucket permissions.

Keep in mind that AWS services may have associated costs. Make sure to monitor your usage and configure services according to your needs. This high-level overview should give you a good starting point for hosting your React SPA on AWS.