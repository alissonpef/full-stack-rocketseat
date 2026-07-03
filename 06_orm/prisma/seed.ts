import { prisma } from "@/prisma"

async function seed() { 
    await prisma.user.createMany({
        data: [
            {
                name: "Alisson Pereira",
                email: "alisson@email.com",
            },
            {
                name: "Vitoria Marques",
                email: "vitoria@email.com",
            },
        ]
    })
}

seed().then(() => {
    console.log("Database seeded!")
    prisma.$disconnect()
})