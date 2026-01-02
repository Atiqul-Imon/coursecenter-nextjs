import ImageKit from 'imagekit'

function getImageKitInstance() {
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY
  const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT

  if (!publicKey || !privateKey || !urlEndpoint) {
    throw new Error('ImageKit credentials are missing. Please set IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, and IMAGEKIT_URL_ENDPOINT in your .env file.')
  }

  return new ImageKit({
    publicKey,
    privateKey,
    urlEndpoint,
  })
}

export async function uploadImage(file: File | Buffer, folder: string = 'courses'): Promise<string> {
  try {
    const imagekit = getImageKitInstance()
    
    // Convert File to buffer if needed
    let buffer: Buffer
    let fileName: string

    if (file instanceof File) {
      const arrayBuffer = await file.arrayBuffer()
      buffer = Buffer.from(arrayBuffer)
      fileName = file.name
    } else {
      buffer = file
      fileName = `image-${Date.now()}.jpg`
    }

    // Upload to ImageKit
    const result = await imagekit.upload({
      file: buffer,
      fileName: fileName,
      folder: `/course-centre/${folder}/`,
      useUniqueFileName: true,
      overwriteFile: false,
    })

    // Return URL with transformations applied
    // ImageKit applies transformations via URL parameters
    return result.url
  } catch (error) {
    console.error('ImageKit upload error:', error)
    throw new Error('Failed to upload image to ImageKit')
  }
}

export async function deleteImage(fileId: string): Promise<void> {
  try {
    const imagekit = getImageKitInstance()
    await imagekit.deleteFile(fileId)
  } catch (error) {
    console.error('ImageKit delete error:', error)
    throw new Error('Failed to delete image from ImageKit')
  }
}

export function extractFileId(url: string): string | null {
  try {
    // ImageKit URLs contain file ID in the path
    // Format: https://ik.imagekit.io/your_imagekit_id/folder/filename.jpg
    const matches = url.match(/\/[^\/]+\/([^\/]+)\/([^\/]+)$/)
    if (matches && matches.length > 0) {
      // For deletion, we need the file ID, not the path
      // We'll need to store fileId separately or extract from URL differently
      // For now, return the full path
      return url
    }
    return null
  } catch {
    return null
  }
}

// Helper to get file ID from ImageKit URL
export async function getFileIdFromUrl(url: string): Promise<string | null> {
  try {
    const imagekit = getImageKitInstance()
    
    // Extract file name from URL
    const fileName = url.split('/').pop()?.split('?')[0]
    if (!fileName) return null

    // List files to find the file ID
    const files = await imagekit.listFiles({
      searchQuery: `name:"${fileName}"`,
      limit: 1,
    })

    if (files && files.length > 0) {
      const file = files[0]
      // Check if it's a FileObject (has fileId) not a FolderObject
      if ('fileId' in file) {
        return file.fileId
      }
    }

    return null
  } catch (error) {
    console.error('Error getting file ID:', error)
    return null
  }
}

