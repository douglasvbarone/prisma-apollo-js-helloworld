const { PrismaClient } = require('@prisma/client')
const { AvatarGenerator } = require('random-avatar-generator')

const avatarGenerator = new AvatarGenerator()

const faker = require('faker')

const prisma = new PrismaClient()

async function main() {
  for (let i = 0; i < 24; i++) {
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()

    await prisma.user.create({
      data: {
        email: faker.internet.email(firstName, lastName),
        name: faker.name.findName(firstName, lastName),
        profile: {
          create: {
            bio: faker.lorem.sentences(2),
            avatar: avatarGenerator.generateRandomAvatar()
          }
        },
        posts: {
          create: [
            {
              title: faker.lorem.sentence(4),
              content: faker.lorem.paragraphs(15),
              published: Boolean(Math.random() > 0.5)
            },
            {
              title: faker.lorem.sentence(5),
              content: faker.lorem.paragraphs(20),
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
