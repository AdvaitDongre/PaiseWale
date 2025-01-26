"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from "date-fns"

interface Document {
  id: string
  name: string
  type: string
  uploadDate: string
  url: string
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Form 16",
      type: "PDF",
      uploadDate: "2024-01-15",
      url: "/sample.pdf",
    },
    {
      id: "2",
      name: "Bank Statement",
      type: "PDF",
      uploadDate: "2024-01-10",
      url: "/sample.pdf",
    },
  ])

  const [newDocument, setNewDocument] = useState({
    name: "",
    file: null as File | null,
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewDocument({
        ...newDocument,
        file: e.target.files[0],
      })
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newDocument.file) return

    // In a real application, you would upload the file to your server here
    // For this example, we'll just simulate the upload
    const doc: Document = {
      id: Date.now().toString(),
      name: newDocument.name,
      type: newDocument.file.type.split("/")[1].toUpperCase(),
      uploadDate: new Date().toISOString().split("T")[0],
      url: URL.createObjectURL(newDocument.file),
    }

    setDocuments([...documents, doc])
    setNewDocument({ name: "", file: null })
  }

  const handleView = (url: string) => {
    window.open(url, "_blank")
  }

  const handleDownload = (url: string, name: string) => {
    const link = document.createElement("a")
    link.href = url
    link.download = name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Documents</h1>

      <Card className="bg-[#2A2A2A] text-white border-none mb-6">
        <CardHeader>
          <CardTitle>Upload New Document</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <Label htmlFor="document-name">Document Name</Label>
              <Input
                id="document-name"
                value={newDocument.name}
                onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
                className="bg-[#1E1E1E] text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="document-file">File</Label>
              <Input
                id="document-file"
                type="file"
                onChange={handleFileChange}
                className="bg-[#1E1E1E] text-white"
                required
              />
            </div>
            <Button type="submit" className="bg-[#00ADB5] hover:bg-[#00BEC8] text-white">
              Upload Document
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-[#2A2A2A] text-white border-none">
        <CardHeader>
          <CardTitle>Your Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>{doc.name}</TableCell>
                  <TableCell>{doc.type}</TableCell>
                  <TableCell>{format(new Date(doc.uploadDate), "PP")}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="mr-2" onClick={() => handleView(doc.url)}>
                      View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownload(doc.url, doc.name)}>
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

