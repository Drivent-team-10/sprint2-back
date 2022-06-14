import { prisma } from '@/config';
import { Prisma, User } from '@prisma/client';

type GithubUserId = Partial<User>;
type UpserGithubData = Pick<User, 'email' | 'githubId'>;

async function findByEmail(email: string, select?: Prisma.UserSelect) {
  const params: Prisma.UserFindUniqueArgs = {
    where: {
      email,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.user.findUnique(params);
}

async function create(data: Prisma.UserUncheckedCreateInput) {
  return prisma.user.create({
    data,
  });
}

async function insertOneUser({ githubId }: GithubUserId) {
  const user = await prisma.user.create({ data: { githubId } });
  return user;
}

async function upsertUserByEmail({ email, githubId }: UpserGithubData) {
  const user = await prisma.user.upsert({
    where: {
      email,
    },
    update: {
      githubId,
    },
    create: {
      githubId,
    },
  });
  return user;
}

async function findUserByGitHubId(id: number) {
  return prisma.user.findUnique({ where: { githubId: id } });
}

const userRepository = {
  findByEmail,
  create,
  upsertUserByEmail,
  insertOneUser,
  findUserByGitHubId,
};

export default userRepository;
