# Course Seeding Script

This script populates the database with universities and courses based on the original Course Centre website structure.

## What it does

1. **Creates 12 popular UK universities** including:
   - University of Oxford
   - University of Cambridge
   - Imperial College London
   - LSE, UCL, Edinburgh, King's College, Manchester, Bristol, Warwick, Birmingham, Leeds

2. **Creates 30+ courses** covering:
   - **Undergraduate courses**: Computer Science, Business Management, Engineering, Psychology, Economics, Nursing, English Literature, Accounting & Finance, Biomedical Sciences
   - **Foundation courses**: Engineering, Business, Science
   - **HND courses**: Computing, Business, Engineering
   - **Top-Up courses**: Business Management, Computing
   - **Postgraduate courses**: Data Science, MBA, Finance, International Business, Computer Science, Engineering Management, Education, Public Health, Marketing, Artificial Intelligence

## Course Categories

Courses are tagged with categories that match the original website filters:
- **Degree Type**: HND, Top-Up, Bachelor, Master
- **Course Category**: Undergraduate, Postgraduate
- **Subject Areas**: Business, Technology, Engineering, Health Sciences, etc.

## Running the Script

Make sure your `.env` file has the correct `DATABASE_URL` configured, then run:

```bash
npm run seed:courses
```

The script will:
- Skip universities that already exist
- Skip courses that already exist (based on slug)
- Create new universities and courses
- Assign courses to universities in a round-robin fashion
- Create course categories for filtering

## Course Details

Each course includes:
- Title and slug
- Level (FOUNDATION, UNDERGRADUATE, POSTGRADUATE, DIPLOMA)
- Duration (1-4 years)
- Tuition fee (in GBP)
- Intake months (September, January, or both)
- Entry requirements
- Categories for filtering
- University assignment

## Notes

- Courses are distributed evenly across all universities
- Tuition fees are representative and may need adjustment
- Entry requirements follow UK university standards
- All courses are set to `isActive: true` by default


