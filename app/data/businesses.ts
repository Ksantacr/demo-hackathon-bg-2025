
// export const businesses: Business[] = [
//   {
//     id: 1,
//     name: "Constructora Andina",
//     email: "contacto@constructoraandina.ec",
//     department: "Construcción",
//     avatar: "/placeholder.svg?height=100&width=100",
//     products: [
//       { id: 1, name: "Cemento Premium", description: "Cemento de alta resistencia" },
//       { id: 2, name: "Arena de construcción", description: "Arena fina para mezclas" },
//     ],
//     applicants: 2,
//     maxApplicants: 3,
//   },
//   {
//     id: 2,
//     name: "Ecuatech Solutions",
//     email: "info@ecuatech.ec",
//     department: "Tecnología",
//     avatar: "/placeholder.svg?height=100&width=100",
//     products: [{ id: 3, name: "Desarrollo web", description: "Desarrollo de sitios web" }],
//     applicants: 0,
//     maxApplicants: 1,
//   },
//   {
//     id: 4,
//     name: "Ferretería El Constructor",
//     email: "ventas@elconstructor.ec",
//     department: "Construcción",
//     avatar: "/placeholder.svg?height=100&width=100",
//     products: [
//       { id: 4, name: "Cemento Constructor", description: "Cemento multiuso" },
//       { id: 5, name: "Bloques", description: "Bloques de construcción" },
//     ],
//     applicants: 3,
//     maxApplicants: 5,
//   },
// ]

export const businesses: Business[] = [
  {
    id: 1,
    name: "Constructora Andina",
    email: "contacto@constructoraandina.ec",
    department: "Construcción",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4.5,
    creditLimit: 10000,
    applicants: 2,
    maxApplicants: 3,
    products: [
      {
        id: 1,
        name: "Cemento Premium",
        description: "Cemento de alta resistencia para construcciones",
        price: 8.5,
      },
      {
        id: 2,
        name: "Arena Fina",
        description: "Arena tamizada para acabados perfectos",
        price: 4.25,
      },
      {
        id: 3,
        name: "Bloques Estándar",
        description: "Bloques de concreto de 15x20x40",
        price: 0.95,
      },
      {
        id: 4,
        name: "Varrilla 3/4",
        description: "Largo: 12 m. Ancho: 3/4 in (19 mm).",
        price: 25,
      },
      {
        id: 5,
        name: "Lamina Asfaltica Asfalum C/R 10Mt Imptek",
        description: "Medidas: 10 m. x 1 m. Peso: 30,5 Kg. IMPTEK",
        price: 110,
      },
    ],
  },
  {
    id: 2,
    name: "Ecuatech Solutions",
    email: "info@ecuatech.ec",
    department: "Tecnología",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4.8,
    creditLimit: 15000,
    applicants: 0,
    maxApplicants: 1,
    products: [
      {
        id: 4,
        name: "Desarrollo Web",
        description: "Desarrollo de sitios web a medida",
        price: 1200,
      },
      {
        id: 5,
        name: "Mantenimiento de Software",
        description: "Soporte y mantenimiento de sistemas",
        price: 500,
      },
    ],
  },
  {
    id: 3,
    name: "Ferretería El Constructor",
    email: "ventas@elconstructor.ec",
    department: "Construcción",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4.2,
    creditLimit: 8000,
    applicants: 3,
    maxApplicants: 5,
    products: [
      {
        id: 6,
        name: "Cemento Constructor",
        description: "Cemento multiuso para obras",
        price: 7.8,
      },
      {
        id: 7,
        name: "Bloques de Construcción",
        description: "Bloques de hormigón para edificaciones",
        price: 1.1,
      },
      {
        id: 8,
        name: "Tornillos Variados",
        description: "Tornillos y fijaciones para diversas aplicaciones",
        price: 0.2,
      },
    ],
  },
  {
    id: 4,
    name: "Innovatech Solutions",
    email: "contacto@innovatech.ec",
    department: "Tecnología",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4.6,
    creditLimit: 12000,
    applicants: 6,
    maxApplicants: 8,
    products: [
      {
        id: 9,
        name: "Consultoría TI",
        description: "Asesoría en infraestructura tecnológica",
        price: 200,
      },
      {
        id: 10,
        name: "Seguridad Informática",
        description: "Soluciones para protección de datos",
        price: 1800,
      },
    ],
  },
];


export type Department =
  | "Construcción"
  | "Tecnología"
  | "Agricultura"
  | "Logística"
  | "Manufactura"
  | "Turismo"
  | "Finanzas"

export interface Product {
  id: number
  name: string
  description: string
  price: number
}


// export interface Business {
//     id: number
//     name: string
//     email: string
//     department: Department
//     avatar: string
//     products: Product[]
//     applicants: number
//     maxApplicants: number
//   }

export interface Business {
  id: number
  name: string
  email: string
  department: Department
  avatar: string
  rating: number
  products: Product[]
  creditLimit: number,
  applicants: number
  maxApplicants: number
}


  
  export interface CartItem {
    productId: number
    quantity: number
    name: string
    price: number
  }