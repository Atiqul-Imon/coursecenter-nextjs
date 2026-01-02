import { PrismaClient, UserRole } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function createAdmin() {
  try {
    console.log("🔐 Creating admin user...")

    // Admin credentials
    const email = "admin@coursecentre.co.uk"
    const password = "Admin@123456"
    const name = "Admin User"

    // Check if admin already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      console.log("⚠️  Admin user already exists!")
      console.log(`📧 Email: ${email}`)
      console.log(`🔑 Password: ${password}`)
      console.log("\nIf you want to reset the password, delete the user first.")
      return
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user with ADMIN role
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: UserRole.ADMIN,
        emailVerified: true,
      },
    })

    // Create admin record
    await prisma.admin.create({
      data: {
        userId: user.id,
        department: "Administration",
      },
    })

    console.log("✅ Admin user created successfully!")
    console.log("\n" + "=".repeat(50))
    console.log("📋 ADMIN CREDENTIALS")
    console.log("=".repeat(50))
    console.log(`📧 Email: ${email}`)
    console.log(`🔑 Password: ${password}`)
    console.log(`👤 Name: ${name}`)
    console.log(`🔐 Role: ADMIN`)
    console.log("=".repeat(50))
    console.log("\n🌐 Login URL: http://localhost:3000/login")
    console.log("📊 Admin Panel: http://localhost:3000/admin")
    console.log("\n⚠️  IMPORTANT: Change the password after first login!")
    console.log("=".repeat(50))
  } catch (error) {
    console.error("❌ Error creating admin user:", error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()

