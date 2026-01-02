import { PrismaClient, CourseLevel } from "@prisma/client"

const prisma = new PrismaClient()

// Popular UK Universities
const universities = [
  {
    name: "University of Oxford",
    slug: "university-of-oxford",
    city: "Oxford",
    country: "United Kingdom",
    ranking: 1,
    established: 1096,
    website: "https://www.ox.ac.uk",
  },
  {
    name: "University of Cambridge",
    slug: "university-of-cambridge",
    city: "Cambridge",
    country: "United Kingdom",
    ranking: 2,
    established: 1209,
    website: "https://www.cam.ac.uk",
  },
  {
    name: "Imperial College London",
    slug: "imperial-college-london",
    city: "London",
    country: "United Kingdom",
    ranking: 3,
    established: 1907,
    website: "https://www.imperial.ac.uk",
  },
  {
    name: "London School of Economics and Political Science",
    slug: "london-school-of-economics",
    city: "London",
    country: "United Kingdom",
    ranking: 4,
    established: 1895,
    website: "https://www.lse.ac.uk",
  },
  {
    name: "University College London",
    slug: "university-college-london",
    city: "London",
    country: "United Kingdom",
    ranking: 5,
    established: 1826,
    website: "https://www.ucl.ac.uk",
  },
  {
    name: "University of Edinburgh",
    slug: "university-of-edinburgh",
    city: "Edinburgh",
    country: "United Kingdom",
    ranking: 6,
    established: 1583,
    website: "https://www.ed.ac.uk",
  },
  {
    name: "King's College London",
    slug: "kings-college-london",
    city: "London",
    country: "United Kingdom",
    ranking: 7,
    established: 1829,
    website: "https://www.kcl.ac.uk",
  },
  {
    name: "University of Manchester",
    slug: "university-of-manchester",
    city: "Manchester",
    country: "United Kingdom",
    ranking: 8,
    established: 1824,
    website: "https://www.manchester.ac.uk",
  },
  {
    name: "University of Bristol",
    slug: "university-of-bristol",
    city: "Bristol",
    country: "United Kingdom",
    ranking: 9,
    established: 1876,
    website: "https://www.bristol.ac.uk",
  },
  {
    name: "University of Warwick",
    slug: "university-of-warwick",
    city: "Coventry",
    country: "United Kingdom",
    ranking: 10,
    established: 1965,
    website: "https://www.warwick.ac.uk",
  },
  {
    name: "University of Birmingham",
    slug: "university-of-birmingham",
    city: "Birmingham",
    country: "United Kingdom",
    ranking: 11,
    established: 1900,
    website: "https://www.birmingham.ac.uk",
  },
  {
    name: "University of Leeds",
    slug: "university-of-leeds",
    city: "Leeds",
    country: "United Kingdom",
    ranking: 12,
    established: 1904,
    website: "https://www.leeds.ac.uk",
  },
]

// Course data based on popular UK courses
const courses = [
  // Undergraduate Courses
  {
    title: "Bachelor of Science in Computer Science",
    level: CourseLevel.UNDERGRADUATE,
    duration: 3,
    tuitionFee: 25000,
    categories: ["Computer Science", "Technology", "Undergraduate"],
    intakeMonths: ["September", "January"],
    entryRequirements: "A-Level: AAB including Mathematics. IELTS: 6.5 overall with no less than 6.0 in each component.",
  },
  {
    title: "Bachelor of Arts in Business Management",
    level: CourseLevel.UNDERGRADUATE,
    duration: 3,
    tuitionFee: 22000,
    categories: ["Business", "Management", "Undergraduate"],
    intakeMonths: ["September"],
    entryRequirements: "A-Level: ABB. IELTS: 6.5 overall with no less than 6.0 in each component.",
  },
  {
    title: "Bachelor of Engineering in Mechanical Engineering",
    level: CourseLevel.UNDERGRADUATE,
    duration: 4,
    tuitionFee: 28000,
    categories: ["Engineering", "Mechanical Engineering", "Undergraduate"],
    intakeMonths: ["September"],
    entryRequirements: "A-Level: AAB including Mathematics and Physics. IELTS: 6.5 overall.",
  },
  {
    title: "Bachelor of Science in Psychology",
    level: CourseLevel.UNDERGRADUATE,
    duration: 3,
    tuitionFee: 23000,
    categories: ["Psychology", "Social Sciences", "Undergraduate"],
    intakeMonths: ["September"],
    entryRequirements: "A-Level: ABB. IELTS: 6.5 overall with no less than 6.0 in each component.",
  },
  {
    title: "Bachelor of Arts in International Relations",
    level: CourseLevel.UNDERGRADUATE,
    duration: 3,
    tuitionFee: 21000,
    categories: ["International Relations", "Politics", "Undergraduate"],
    intakeMonths: ["September"],
    entryRequirements: "A-Level: ABB. IELTS: 7.0 overall with no less than 6.5 in each component.",
  },
  {
    title: "Bachelor of Science in Economics",
    level: CourseLevel.UNDERGRADUATE,
    duration: 3,
    tuitionFee: 24000,
    categories: ["Economics", "Business", "Undergraduate"],
    intakeMonths: ["September"],
    entryRequirements: "A-Level: AAB including Mathematics. IELTS: 6.5 overall.",
  },
  {
    title: "Bachelor of Science in Nursing",
    level: CourseLevel.UNDERGRADUATE,
    duration: 3,
    tuitionFee: 20000,
    categories: ["Nursing", "Health Sciences", "Undergraduate"],
    intakeMonths: ["September", "January"],
    entryRequirements: "A-Level: BBB. IELTS: 7.0 overall with no less than 7.0 in each component.",
  },
  {
    title: "Bachelor of Arts in English Literature",
    level: CourseLevel.UNDERGRADUATE,
    duration: 3,
    tuitionFee: 20000,
    categories: ["English Literature", "Arts", "Undergraduate"],
    intakeMonths: ["September"],
    entryRequirements: "A-Level: ABB including English. IELTS: 7.0 overall with no less than 6.5 in each component.",
  },
  {
    title: "Bachelor of Science in Accounting and Finance",
    level: CourseLevel.UNDERGRADUATE,
    duration: 3,
    tuitionFee: 23000,
    categories: ["Accounting", "Finance", "Undergraduate"],
    intakeMonths: ["September"],
    entryRequirements: "A-Level: ABB including Mathematics. IELTS: 6.5 overall.",
  },
  {
    title: "Bachelor of Science in Biomedical Sciences",
    level: CourseLevel.UNDERGRADUATE,
    duration: 3,
    tuitionFee: 26000,
    categories: ["Biomedical Sciences", "Health Sciences", "Undergraduate"],
    intakeMonths: ["September"],
    entryRequirements: "A-Level: AAB including Biology and Chemistry. IELTS: 6.5 overall.",
  },
  // Foundation Courses
  {
    title: "Foundation in Engineering",
    level: CourseLevel.FOUNDATION,
    duration: 1,
    tuitionFee: 15000,
    categories: ["Engineering", "Foundation", "Undergraduate"],
    intakeMonths: ["September", "January"],
    entryRequirements: "High School Diploma with good grades. IELTS: 5.5 overall with no less than 5.0 in each component.",
  },
  {
    title: "Foundation in Business",
    level: CourseLevel.FOUNDATION,
    duration: 1,
    tuitionFee: 14000,
    categories: ["Business", "Foundation", "Undergraduate"],
    intakeMonths: ["September", "January"],
    entryRequirements: "High School Diploma. IELTS: 5.5 overall.",
  },
  {
    title: "Foundation in Science",
    level: CourseLevel.FOUNDATION,
    duration: 1,
    tuitionFee: 15000,
    categories: ["Science", "Foundation", "Undergraduate"],
    intakeMonths: ["September", "January"],
    entryRequirements: "High School Diploma with Science subjects. IELTS: 5.5 overall.",
  },
  // HND Courses
  {
    title: "HND in Computing",
    level: CourseLevel.DIPLOMA,
    duration: 2,
    tuitionFee: 12000,
    categories: ["Computing", "HND", "Technology", "Undergraduate"],
    intakeMonths: ["September", "January"],
    entryRequirements: "High School Diploma or equivalent. IELTS: 5.5 overall.",
  },
  {
    title: "HND in Business",
    level: CourseLevel.DIPLOMA,
    duration: 2,
    tuitionFee: 11000,
    categories: ["Business", "HND", "Undergraduate"],
    intakeMonths: ["September", "January"],
    entryRequirements: "High School Diploma or equivalent. IELTS: 5.5 overall.",
  },
  {
    title: "HND in Engineering",
    level: CourseLevel.DIPLOMA,
    duration: 2,
    tuitionFee: 13000,
    categories: ["Engineering", "HND", "Undergraduate"],
    intakeMonths: ["September", "January"],
    entryRequirements: "High School Diploma with Mathematics. IELTS: 5.5 overall.",
  },
  // Top-Up Courses
  {
    title: "Top-Up BSc (Hons) in Business Management",
    level: CourseLevel.UNDERGRADUATE,
    duration: 1,
    tuitionFee: 15000,
    categories: ["Business", "Top-Up", "Management", "Undergraduate"],
    intakeMonths: ["September", "January"],
    entryRequirements: "HND or equivalent qualification in Business. IELTS: 6.0 overall.",
  },
  {
    title: "Top-Up BSc (Hons) in Computing",
    level: CourseLevel.UNDERGRADUATE,
    duration: 1,
    tuitionFee: 16000,
    categories: ["Computing", "Top-Up", "Technology", "Undergraduate"],
    intakeMonths: ["September", "January"],
    entryRequirements: "HND or equivalent qualification in Computing. IELTS: 6.0 overall.",
  },
  // Postgraduate Courses
  {
    title: "Master of Science in Data Science",
    level: CourseLevel.POSTGRADUATE,
    duration: 1,
    tuitionFee: 28000,
    categories: ["Data Science", "Technology", "Postgraduate"],
    intakeMonths: ["September", "January"],
    entryRequirements: "Bachelor's degree (2:1 or above) in a related subject. IELTS: 6.5 overall with no less than 6.0 in each component.",
  },
  {
    title: "Master of Business Administration (MBA)",
    level: CourseLevel.POSTGRADUATE,
    duration: 1,
    tuitionFee: 35000,
    categories: ["Business", "MBA", "Management", "Postgraduate"],
    intakeMonths: ["September", "January"],
    entryRequirements: "Bachelor's degree (2:1 or above) and 3+ years work experience. IELTS: 7.0 overall.",
  },
  {
    title: "Master of Science in Finance",
    level: CourseLevel.POSTGRADUATE,
    duration: 1,
    tuitionFee: 30000,
    categories: ["Finance", "Business", "Postgraduate"],
    intakeMonths: ["September"],
    entryRequirements: "Bachelor's degree (2:1 or above) in Finance, Economics, or related field. IELTS: 6.5 overall.",
  },
  {
    title: "Master of Science in International Business",
    level: CourseLevel.POSTGRADUATE,
    duration: 1,
    tuitionFee: 27000,
    categories: ["International Business", "Business", "Postgraduate"],
    intakeMonths: ["September", "January"],
    entryRequirements: "Bachelor's degree (2:1 or above). IELTS: 6.5 overall.",
  },
  {
    title: "Master of Science in Computer Science",
    level: CourseLevel.POSTGRADUATE,
    duration: 1,
    tuitionFee: 29000,
    categories: ["Computer Science", "Technology", "Postgraduate"],
    intakeMonths: ["September", "January"],
    entryRequirements: "Bachelor's degree (2:1 or above) in Computer Science or related field. IELTS: 6.5 overall.",
  },
  {
    title: "Master of Science in Engineering Management",
    level: CourseLevel.POSTGRADUATE,
    duration: 1,
    tuitionFee: 28000,
    categories: ["Engineering", "Management", "Postgraduate"],
    intakeMonths: ["September"],
    entryRequirements: "Bachelor's degree (2:1 or above) in Engineering. IELTS: 6.5 overall.",
  },
  {
    title: "Master of Arts in Education",
    level: CourseLevel.POSTGRADUATE,
    duration: 1,
    tuitionFee: 22000,
    categories: ["Education", "Postgraduate"],
    intakeMonths: ["September", "January"],
    entryRequirements: "Bachelor's degree (2:1 or above). IELTS: 6.5 overall.",
  },
  {
    title: "Master of Science in Public Health",
    level: CourseLevel.POSTGRADUATE,
    duration: 1,
    tuitionFee: 25000,
    categories: ["Public Health", "Health Sciences", "Postgraduate"],
    intakeMonths: ["September"],
    entryRequirements: "Bachelor's degree (2:1 or above) in Health Sciences or related field. IELTS: 6.5 overall.",
  },
  {
    title: "Master of Science in Marketing",
    level: CourseLevel.POSTGRADUATE,
    duration: 1,
    tuitionFee: 26000,
    categories: ["Marketing", "Business", "Postgraduate"],
    intakeMonths: ["September", "January"],
    entryRequirements: "Bachelor's degree (2:1 or above). IELTS: 6.5 overall.",
  },
  {
    title: "Master of Science in Artificial Intelligence",
    level: CourseLevel.POSTGRADUATE,
    duration: 1,
    tuitionFee: 31000,
    categories: ["Artificial Intelligence", "Technology", "Postgraduate"],
    intakeMonths: ["September"],
    entryRequirements: "Bachelor's degree (2:1 or above) in Computer Science or related field. IELTS: 6.5 overall.",
  },
]

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

async function main() {
  console.log("🌱 Starting course seeding...")

  // Create or get universities
  const universityMap = new Map<string, string>()

  for (const uni of universities) {
    const existing = await prisma.university.findUnique({
      where: { slug: uni.slug },
    })

    if (existing) {
      universityMap.set(uni.name, existing.id)
      console.log(`✓ University already exists: ${uni.name}`)
    } else {
      const created = await prisma.university.create({
        data: uni,
      })
      universityMap.set(uni.name, created.id)
      console.log(`✓ Created university: ${uni.name}`)
    }
  }

  // Create courses
  const universityNames = Array.from(universityMap.keys())
  let courseCount = 0

  for (const courseData of courses) {
    // Distribute courses across universities
    const universityName = universityNames[courseCount % universityNames.length]
    const universityId = universityMap.get(universityName)!

    const slug = slugify(courseData.title)
    const existing = await prisma.course.findUnique({
      where: { slug },
    })

    if (existing) {
      console.log(`⚠ Course already exists: ${courseData.title}`)
      continue
    }

    const { categories, ...courseFields } = courseData

    const course = await prisma.course.create({
      data: {
        ...courseFields,
        slug,
        universityId,
        shortDescription: `${courseData.title} at ${universityName}. Duration: ${courseData.duration} year(s).`,
        description: `This ${courseData.level.toLowerCase()} program in ${courseData.title} offers comprehensive education and training. ${courseData.entryRequirements || ""}`,
        image: `https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop`,
      },
    })

    // Create course categories
    for (const category of categories) {
      await prisma.courseCategory.create({
        data: {
          courseId: course.id,
          category,
        },
      })
    }

    courseCount++
    console.log(`✓ Created course: ${courseData.title} at ${universityName}`)
  }

  console.log(`\n✅ Successfully seeded ${courseCount} courses across ${universityMap.size} universities!`)
}

main()
  .catch((e) => {
    console.error("❌ Error seeding courses:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


