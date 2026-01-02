# ImageKit Setup Guide

This guide explains how to set up ImageKit for image uploads in the Course Centre admin panel.

## Prerequisites

1. An ImageKit account (sign up at https://imagekit.io - free tier available)
2. Your ImageKit credentials

## Setup Steps

### 1. Get Your ImageKit Credentials

1. Log in to your ImageKit dashboard
2. Go to Settings → Developer Options
3. Copy the following values:
   - **Public Key**
   - **Private Key**
   - **URL Endpoint** (e.g., `https://ik.imagekit.io/your_imagekit_id`)

### 2. Add Environment Variables

Add the following to your `.env` file (or `.env.local`):

```env
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
```

### 3. Verify Setup

1. Start your development server: `npm run dev`
2. Navigate to `/admin/courses/new`
3. Try uploading an image
4. If successful, the image will be uploaded to ImageKit and the URL will be saved

## How It Works

### Image Upload Flow

1. **Admin selects image** → Image is validated (type, size)
2. **Image uploaded to ImageKit** → Stored in `course-centre/courses/` folder
3. **ImageKit URL returned** → Saved to database
4. **Image optimized** → ImageKit automatically optimizes images

### Image Management

- **Upload**: Images are uploaded to ImageKit when creating/editing courses
- **Delete**: When a course is deleted or image is removed, the old image is deleted from ImageKit
- **Update**: When replacing an image, the old one is automatically deleted

## Features

- ✅ Automatic image optimization
- ✅ Responsive image delivery
- ✅ Automatic format conversion (WebP, AVIF)
- ✅ Secure cloud storage
- ✅ Global CDN delivery for fast loading
- ✅ Automatic cleanup of old images
- ✅ Real-time image transformations

## API Endpoints

- `POST /api/admin/upload` - Upload image to ImageKit
- `POST /api/admin/courses` - Create course (with image)
- `PUT /api/admin/courses/[id]` - Update course (with image)
- `DELETE /api/admin/courses/[id]` - Delete course (and image)

## Troubleshooting

### Image not uploading?

1. Check your `.env` file has all three ImageKit variables
2. Verify credentials in ImageKit dashboard
3. Check browser console for errors
4. Ensure image is under 10MB

### Image not displaying?

1. Check `next.config.ts` includes `ik.imagekit.io` in `remotePatterns`
2. Verify the image URL is a valid ImageKit URL
3. Check browser network tab for 404 errors

## Security Notes

- Never commit `.env` file to version control
- Keep your Private Key secure
- Use environment variables in production
- Consider using ImageKit's signed URLs for additional security

