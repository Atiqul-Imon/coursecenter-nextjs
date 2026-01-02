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
import { Eye, Download, FileText } from "lucide-react"
import Link from "next/link"

async function getGDPRRequests() {
  try {
    const requests = await prisma.gDPRRequest.findMany({
      orderBy: { requestedAt: "desc" },
      take: 100,
    })
    return requests
  } catch (error) {
    console.error("Error fetching GDPR requests:", error)
    return []
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "COMPLETED":
      return "default"
    case "PROCESSING":
      return "secondary"
    case "REJECTED":
      return "destructive"
    case "PENDING":
    default:
      return "outline"
  }
}

function getRequestTypeLabel(type: string) {
  switch (type) {
    case "access":
      return "Data Access"
    case "deletion":
      return "Data Deletion"
    case "portability":
      return "Data Portability"
    case "rectification":
      return "Data Rectification"
    default:
      return type
  }
}

export default async function AdminGDPRPage() {
  const requests = await getGDPRRequests()

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">GDPR Requests</h1>
        <p className="text-muted-foreground">Manage and track GDPR data requests from users</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All GDPR Requests ({requests.length})</CardTitle>
          <CardDescription>Track data access, deletion, and portability requests</CardDescription>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <div className="py-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-muted-foreground">No GDPR requests found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request Type</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Requested</TableHead>
                    <TableHead>Completed</TableHead>
                    <TableHead>Verified</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">
                        {getRequestTypeLabel(request.requestType)}
                      </TableCell>
                      <TableCell>{request.email}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(request.requestedAt)}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {request.completedAt ? formatDate(request.completedAt) : "—"}
                      </TableCell>
                      <TableCell>
                        <Badge variant={request.verified ? "default" : "outline"}>
                          {request.verified ? "Yes" : "No"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/gdpr/${request.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

