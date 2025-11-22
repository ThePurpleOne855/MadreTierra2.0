# Complete EmailJS Setup Guide - Two-Way Email System

## Overview

This guide will help you set up:
1. **Notification Email** - Sent to YOU when someone contacts you
2. **Confirmation Email** - Sent to the VISITOR confirming their message was received

Both emails will be beautifully formatted with professional HTML templates.

---

## Step 1: Get Your EmailJS Credentials

### 1.1 Go to EmailJS Dashboard
👉 **https://dashboard.emailjs.com/**

Sign in (or create an account if needed - free tier includes 200 emails/month)

### 1.2 Get Your Public Key
- Click **Account** (top right) → **API Keys** tab
- Copy your **Public Key** (looks like: `abc123xyz789...`)
- **Save this** - you'll need it for Vercel

### 1.3 Set Up Your Email Service
- Go to **Email Services** (left sidebar)
- Click **Add New Service**
- Choose your email provider (Gmail, Outlook, etc.)
- Follow the connection steps
- Copy your **Service ID** (looks like: `service_abc123`)
- **Save this** - you'll need it for Vercel

---

## Step 2: Create Template 1 - Notification Email (To You)

This is the email YOU receive when someone contacts you.

### 2.1 Create the Template
1. Go to **Email Templates** (left sidebar)
2. Click **Create New Template**
3. **Template Name:** `Contact Form Notification - MadreTierra`
4. **Service:** Select your email service

### 2.2 Set Up the Email

**Subject Line:**
```
New Contact Form Submission: {{subject}}
```

**Reply To:**
```
{{from_email}}
```
*(This allows you to click "Reply" and respond directly to the visitor)*

**To Email:**
*(Your email address - the one connected to your EmailJS service)*

**Email Content (HTML):**
Copy and paste this entire HTML template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f4f4f4;">
    <tr>
      <td style="padding: 20px 0;">
        <table role="presentation" style="width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #8B4513 0%, #654321 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #D4AF37; font-size: 28px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">
                MadreTierra Cigars
              </h1>
              <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px;">
                New Contact Form Submission
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                You have received a new message from the MadreTierra Cigars contact form.
              </p>
              
              <!-- Info Box -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f9f9f9; border-left: 4px solid #8B4513; margin: 20px 0;">
                <tr>
                  <td style="padding: 20px;">
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0;">
                          <strong style="color: #8B4513; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">From:</strong>
                          <span style="color: #333333; font-size: 16px; margin-left: 10px;">{{from_name}}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <strong style="color: #8B4513; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Email:</strong>
                          <a href="mailto:{{from_email}}" style="color: #8B4513; font-size: 16px; margin-left: 10px; text-decoration: none;">{{from_email}}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <strong style="color: #8B4513; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Subject:</strong>
                          <span style="color: #333333; font-size: 16px; margin-left: 10px;">{{subject}}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Message Box -->
              <div style="background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 4px; padding: 20px; margin: 20px 0;">
                <h3 style="margin: 0 0 15px 0; color: #8B4513; font-size: 18px; text-transform: uppercase; letter-spacing: 1px;">
                  Message:
                </h3>
                <p style="margin: 0; color: #333333; font-size: 16px; line-height: 1.8; white-space: pre-wrap;">{{message}}</p>
              </div>
              
              <!-- Action Button -->
              <table role="presentation" style="width: 100%; margin: 30px 0;">
                <tr>
                  <td style="text-align: center;">
                    <a href="mailto:{{from_email}}?subject=Re: {{subject}}" style="display: inline-block; background-color: #8B4513; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                      Reply to {{from_name}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9f9f9; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0; color: #666666; font-size: 12px;">
                This email was sent from the MadreTierra Cigars website contact form.<br>
                You can reply directly to this email to respond to {{from_name}}.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

### 2.3 Save and Get Template ID
1. Click **Save**
2. Copy your **Template ID** (looks like: `template_abc123`)
3. **Save this** - you'll add it to Vercel as `VITE_EMAILJS_TEMPLATE_ID`

---

## Step 3: Create Template 2 - Confirmation Email (To Visitor)

This is the automatic confirmation email sent to visitors.

### 3.1 Create the Template
1. Go to **Email Templates** (left sidebar)
2. Click **Create New Template** again
3. **Template Name:** `Contact Form Confirmation - MadreTierra`
4. **Service:** Select your email service

### 3.2 Set Up the Email

**Subject Line:**
```
Thank You for Contacting MadreTierra Cigars
```

**To Email:**
```
{{visitor_email}}
```
*(This sends the email to the visitor)*

**Reply To:**
*(Your business email address)*

**Email Content (HTML):**
Copy and paste this entire HTML template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting Us</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f4f4f4;">
    <tr>
      <td style="padding: 20px 0;">
        <table role="presentation" style="width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #8B4513 0%, #654321 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #D4AF37; font-size: 28px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">
                MadreTierra Cigars
              </h1>
              <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px;">
                Thank You for Contacting Us
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px 0; color: #333333; font-size: 18px; line-height: 1.6;">
                Dear {{visitor_name}},
              </p>
              
              <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.8;">
                Thank you for reaching out to MadreTierra Cigars! We have successfully received your message and appreciate you taking the time to contact us.
              </p>
              
              <!-- Message Summary Box -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f9f9f9; border-left: 4px solid #8B4513; margin: 20px 0;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 10px 0; color: #8B4513; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">
                      Your Message Summary:
                    </p>
                    <p style="margin: 5px 0; color: #333333; font-size: 14px;">
                      <strong>Subject:</strong> {{visitor_subject}}
                    </p>
                    <p style="margin: 5px 0; color: #333333; font-size: 14px;">
                      <strong>Message:</strong> {{visitor_message}}
                    </p>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 20px 0; color: #333333; font-size: 16px; line-height: 1.8;">
                Our team will review your message and get back to you as soon as possible, typically within 24-48 hours. We value your interest in MadreTierra Cigars and look forward to assisting you.
              </p>
              
              <p style="margin: 20px 0; color: #333333; font-size: 16px; line-height: 1.8;">
                In the meantime, feel free to explore our premium selection of handcrafted cigars and learn more about our story.
              </p>
              
              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; margin: 30px 0;">
                <tr>
                  <td style="text-align: center;">
                    <a href="https://yourwebsite.com/selection" style="display: inline-block; background-color: #8B4513; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                      Explore Our Selection
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 20px 0 0 0; color: #333333; font-size: 16px; line-height: 1.8;">
                Best regards,<br>
                <strong style="color: #8B4513;">The MadreTierra Cigars Team</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9f9f9; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 10px 0; color: #666666; font-size: 12px;">
                This is an automated confirmation email. Please do not reply to this message.
              </p>
              <p style="margin: 0; color: #666666; font-size: 12px;">
                If you have any questions, please contact us through our website.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

**Important:** Replace `https://yourwebsite.com/selection` with your actual website URL in the "Explore Our Selection" button.

### 3.3 Save and Get Template ID
1. Click **Save**
2. Copy your **Template ID** (looks like: `template_xyz789`)
3. **Save this** - you'll add it to Vercel as `VITE_EMAILJS_VISITOR_TEMPLATE_ID`

---

## Step 4: Add Environment Variables to Vercel

Now add all your credentials to Vercel:

1. Go to your **Vercel project dashboard**
2. Navigate to **Settings** → **Environment Variables**
3. Click **Add New** for each variable:

### Variable 1: Public Key
- **Key:** `VITE_EMAILJS_PUBLIC_KEY`
- **Value:** Your Public Key from Step 1.2
- **Environments:** ☑ Production, ☑ Preview

### Variable 2: Service ID
- **Key:** `VITE_EMAILJS_SERVICE_ID`
- **Value:** Your Service ID from Step 1.3
- **Environments:** ☑ Production, ☑ Preview

### Variable 3: Owner Template ID
- **Key:** `VITE_EMAILJS_TEMPLATE_ID`
- **Value:** Your Template ID from Step 2.3 (Notification email)
- **Environments:** ☑ Production, ☑ Preview

### Variable 4: Visitor Template ID (Optional but Recommended)
- **Key:** `VITE_EMAILJS_VISITOR_TEMPLATE_ID`
- **Value:** Your Template ID from Step 3.3 (Confirmation email)
- **Environments:** ☑ Production, ☑ Preview

**Note:** If you don't add the visitor template ID, only you will receive emails. The visitor confirmation is optional but recommended for better user experience.

---

## Step 5: Redeploy Your Application

1. Go to **Deployments** tab in Vercel
2. Click the **⋯** (three dots) on your latest deployment
3. Select **Redeploy**
4. Wait for deployment to complete

---

## Step 6: Test Your Setup

1. Go to your deployed website
2. Fill out the contact form
3. Submit it
4. Check:
   - ✅ You receive a notification email (beautifully formatted)
   - ✅ The visitor receives a confirmation email (if you set up Template 2)
   - ✅ You can click "Reply" on your email to respond directly to the visitor

---

## Troubleshooting

### Emails not sending?
- Check browser console (F12) for error messages
- Verify all 4 environment variables are set in Vercel
- Make sure you redeployed after adding variables
- Check EmailJS dashboard for service status

### Visitor not receiving confirmation?
- Make sure `VITE_EMAILJS_VISITOR_TEMPLATE_ID` is set in Vercel
- Check that the "To Email" field in Template 2 is set to `{{visitor_email}}`
- Verify the visitor's email address is valid

### Reply-To not working?
- In Template 1, make sure "Reply To" is set to `{{from_email}}`
- Some email providers may require additional configuration

---

## Summary

You now have:
- ✅ Professional HTML email templates
- ✅ Two-way email system (you + visitor)
- ✅ Ability to reply directly to visitors
- ✅ Beautiful, branded email design

Your contact form will now send beautifully formatted emails to both you and your visitors!


