import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/db"
import { formatDate } from "@/lib/utils"
import { Calendar, Eye } from "lucide-react"
import Link from "next/link"

async function getConsultations() {
  try {
    const consultations = await prisma.consultation.findMany({
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { scheduledAt: "desc" },
      take: 50,
    })
    return consultations
  } catch (error) {
    console.error("Error fetching consultations:", error)
    return []
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "CONFIRMED":
      return "default"
    case "SCHEDULED":
      return "secondary"
    case "COMPLETED":
      return "outline"
    case "CANCELLED":
      return "destructive"
    default:
      return "outline"
  }
}

export default async function ConsultationsPage() {
  const consultations = await getConsultations()

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Consultations</h1>
        <p className="text-gray-600 mt-1">Manage all student consultations</p>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>All Consultations</CardTitle>
          <CardDescription>View and manage consultation sessions</CardDescription>
        </CardHeader>
        <CardContent>
          {consultations.length === 0 ? (
            <div className="py-12 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No consultations found.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Scheduled Date</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {consultations.map((consultation) => (
                  <TableRow key={consultation.id}>
                    <TableCell>
                      <div className="font-medium text-gray-900">
                        {consultation.student.name || consultation.student.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        {consultation.student.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{consultation.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-900">
                        {new Date(consultation.scheduledAt).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(consultation.scheduledAt).toLocaleTimeString()}
                      </div>
                    </TableCell>
                    <TableCell>{consultation.duration} minutes</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(consultation.status)}>
                        {consultation.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/consultations/${consultation.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

