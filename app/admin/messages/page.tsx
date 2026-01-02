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
import { MessageSquare, Eye } from "lucide-react"
import Link from "next/link"

async function getMessages() {
  try {
    const messages = await prisma.message.findMany({
      include: {
        fromUser: true,
        toUser: true,
        consultation: true,
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    })
    return messages
  } catch (error) {
    console.error("Error fetching messages:", error)
    return []
  }
}

export default async function MessagesPage() {
  const messages = await getMessages()

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Messages</h1>
        <p className="text-gray-600 mt-1">Manage all platform messages</p>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>All Messages</CardTitle>
          <CardDescription>View and manage user messages</CardDescription>
        </CardHeader>
        <CardContent>
          {messages.length === 0 ? (
            <div className="py-12 text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No messages found.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell>
                      <div className="font-medium text-gray-900">
                        {message.fromUser.name || message.fromUser.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-600">
                        {message.toUser?.name || message.toUser?.email || "N/A"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-gray-900">
                        {message.subject || "No subject"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-600 line-clamp-2 max-w-xs">
                        {message.content}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={message.isRead ? "outline" : "default"}>
                        {message.isRead ? "Read" : "Unread"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {formatDate(message.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/messages/${message.id}`}>
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

