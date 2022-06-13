import { prisma } from '@/config';
import { Prisma, User } from '@prisma/client';

// type GithubUser = Pick<User, 'githubId'>;

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

async function insertOneUser({ id }) {
  return id;
}

async function upsertUserByEmail({ email, githubId }) {
  return { email, githubId };
}

async function findUserByGitHubId(id: number) {
  return id;
}

const userRepository = {
  findByEmail,
  create,
  upsertUserByEmail,
  insertOneUser,
  findUserByGitHubId,
};

export default userRepository;
