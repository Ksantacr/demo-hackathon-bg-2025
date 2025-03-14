"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Mail,
  Phone,
  MoreHorizontal,
  Home,
  BookOpen,
  GraduationCap,
  Users,
  Grid3X3,
  Network,
  User,
  LogOut,
  Settings,
} from "lucide-react"

type Person = {
  id: number
  name: string
  email: string
  department: string; // "Operations" | "PR" | "Product" | "Development" | "Finance" | "Sales"
  avatar: string
}

export default function PeopleDirectory() {
  const [activeFilter, setActiveFilter] = useState<string>("Todas")

  const people: Person[] = [
    {
      id: 1,
      name: "Constructora Andina",
      email: "contacto@constructoraandina.ec",
      department: "Construcción",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Ecuatech Solutions",
      email: "info@ecuatech.ec",
      department: "Tecnología",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "AgroExport S.A.",
      email: "ventas@agroexport.ec",
      department: "Agricultura",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 4,
      name: "Ferretería El Constructor",
      email: "ventas@elconstructor.ec",
      department: "Construcción",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 5,
      name: "Transporte Expreso",
      email: "contacto@transporteexpreso.ec",
      department: "Logística",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 6,
      name: "EcoMuebles S.A.",
      email: "info@ecomuebles.ec",
      department: "Manufactura",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 7,
      name: "Turismo Andes",
      email: "reservas@turismoandes.ec",
      department: "Turismo",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 8,
      name: "Consultora FinanServ",
      email: "contacto@finanserv.ec",
      department: "Finanzas",
      avatar: "/placeholder.svg?height=100&width=100",
    }
  ];

  const filters = [
    "Todas",
    "Construcción",
    "Tecnología",
    "Agricultura",
    "Turismo",
    "Finanzas"
  ];

  const filteredPeople =
    activeFilter === "Todas" ? people : people.filter((person) => person.department === activeFilter)

  const getDepartmentColor = (department: string) => {
    const colors = {
      Construcción: "bg-amber-100 text-amber-800",
      Tecnología: "bg-sky-100 text-sky-800",
      Agricultura: "bg-red-100 text-red-800",
      Turismo: "bg-green-100 text-green-800",
      Finanzas: "bg-gray-200 text-gray-800",
      Textil: "bg-amber-50 text-amber-800",
      Comercio: "bg-green-50 text-amber-800",
    }
    return colors[department as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
      <div className="flex-1 overflow-auto p-8">
        <h1 className="text-4xl font-bold mb-6">Directorio de PYMES</h1>

        {/* Filters */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? "bg-amber-300 text-amber-900"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="w-64">
            <div className="relative">
              <Input type="text" placeholder="Search" className="pl-10 pr-4 py-2 rounded-md border border-gray-300" />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* People grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPeople.map((person) => (
            <div key={person.id} className="border border-gray-200 rounded-lg p-6 flex flex-col items-center">
              <div
                className={`px-4 py-1 rounded-full text-xs font-medium mb-4 ${getDepartmentColor(person.department)}`}
              >
                {person.department}
              </div>

              <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                <img
                  src={person.avatar || "/placeholder.svg"}
                  alt={person.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-lg font-semibold text-center">{person.name}</h3>
              <p className="text-sm text-gray-500 mb-6">{person.email}</p>

              <div className="flex gap-2 mt-auto">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Mail className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}

