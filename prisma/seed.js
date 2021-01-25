const { PrismaClient } = require('@prisma/client')

const faker = require('faker')

const prisma = new PrismaClient()

async function main() {
  for (let i = 0; i < 10; i++) {
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()

    await prisma.user.create({
      data: {
        email: faker.internet.email(firstName, lastName),
        name: faker.name.findName(firstName, lastName),
        profile: {
          create: {
            bio: faker.lorem.sentence()
          }
        },
        posts: {
          create: [
            {
              title: faker.lorem.sentence(5),
              content: faker.lorem.paragraphs(5),
              published: Boolean(Math.random() > 0.5)
            },
            {
              title: faker.lorem.sentence(5),
              content: faker.lorem.paragraphs(5),
              published: Boolean(Math.random() > 0.5)
            }
          ]
        }
      }
    })
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
