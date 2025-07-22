import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // 1. Criar Application
  const authfyApp = await prisma.application.upsert({
    where: { name: "AuthFy System" },
    update: {},
    create: {
      name: "AuthFy System",
      description: "Authentication and Authorization System",
    },
  });

  console.log("✅ Application created:", authfyApp.name);

  // 2. Criar Modules
  const userModule = await prisma.module.upsert({
    where: { name: "User Management" },
    update: {},
    create: {
      name: "User Management",
      description: "Manage users and profiles",
      applicationId: authfyApp.id,
    },
  });

  const roleModule = await prisma.module.upsert({
    where: { name: "Role Management" },
    update: {},
    create: {
      name: "Role Management",
      description: "Manage roles and permissions",
      applicationId: authfyApp.id,
    },
  });

  console.log("✅ Modules created:", userModule.name, roleModule.name);

  // 3. Criar Permissions
  const permissions = [
    // User permissions
    {
      name: "CREATE_USER",
      description: "Create new users",
      moduleId: userModule.id,
    },
    {
      name: "READ_USER",
      description: "View user information",
      moduleId: userModule.id,
    },
    {
      name: "UPDATE_USER",
      description: "Update user information",
      moduleId: userModule.id,
    },
    {
      name: "DELETE_USER",
      description: "Delete users",
      moduleId: userModule.id,
    },

    // Role permissions
    {
      name: "CREATE_ROLE",
      description: "Create new roles",
      moduleId: roleModule.id,
    },
    {
      name: "READ_ROLE",
      description: "View role information",
      moduleId: roleModule.id,
    },
    {
      name: "UPDATE_ROLE",
      description: "Update role information",
      moduleId: roleModule.id,
    },
    {
      name: "DELETE_ROLE",
      description: "Delete roles",
      moduleId: roleModule.id,
    },
    {
      name: "ASSIGN_ROLE",
      description: "Assign roles to users",
      moduleId: roleModule.id,
    },
  ];

  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: { name: permission.name },
      update: {},
      create: permission,
    });
  }

  console.log("✅ Permissions created:", permissions.length);

  // 4. Criar Roles
  const adminRole = await prisma.role.upsert({
    where: { name: "Admin" },
    update: {},
    create: {
      name: "Admin",
      description: "Full system access",
    },
  });

  const userRole = await prisma.role.upsert({
    where: { name: "User" },
    update: {},
    create: {
      name: "User",
      description: "Basic user access",
    },
  });

  const moderatorRole = await prisma.role.upsert({
    where: { name: "Moderator" },
    update: {},
    create: {
      name: "Moderator",
      description: "Moderate user access",
    },
  });

  console.log(
    "✅ Roles created:",
    adminRole.name,
    userRole.name,
    moderatorRole.name
  );

  // 5. Atribuir todas as permissões ao Admin
  const allPermissions = await prisma.permission.findMany();

  for (const permission of allPermissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: adminRole.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId: adminRole.id,
        permissionId: permission.id,
      },
    });
  }

  // 6. Atribuir permissões básicas ao User
  const userPermissions = await prisma.permission.findMany({
    where: {
      name: {
        in: ["READ_USER", "UPDATE_USER"],
      },
    },
  });

  for (const permission of userPermissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: userRole.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId: userRole.id,
        permissionId: permission.id,
      },
    });
  }

  console.log("✅ Role permissions assigned");

  // 7. Criar usuário Admin
  const hashedPassword = await bcrypt.hash("admin123", 12);

  const adminUser = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      name: "System Administrator",
      email: "admin@authfy.com",
      username: "admin",
      password: hashedPassword,
    },
  });

  // 8. Atribuir role Admin ao usuário
  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: adminUser.id,
        roleId: adminRole.id,
      },
    },
    update: {},
    create: {
      userId: adminUser.id,
      roleId: adminRole.id,
    },
  });

  console.log("✅ Admin user created:", adminUser.username);

  // 9. Criar usuário comum para teste
  const testUserPassword = await bcrypt.hash("user123", 12);

  const testUser = await prisma.user.upsert({
    where: { username: "testuser" },
    update: {},
    create: {
      name: "Test User",
      email: "test@authfy.com",
      username: "testuser",
      password: testUserPassword,
    },
  });

  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: testUser.id,
        roleId: userRole.id,
      },
    },
    update: {},
    create: {
      userId: testUser.id,
      roleId: userRole.id,
    },
  });

  console.log("✅ Test user created:", testUser.username);
  console.log("🎉 Database seeding completed!");
}

main()
  .catch(e => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
