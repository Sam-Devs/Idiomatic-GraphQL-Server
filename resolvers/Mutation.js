const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId} = require("../src/utils");

const signup = async (parent, args, context) => {
  const password = await bcrypt.hash(args.password, 10);

  const user = await context.prisma.user.create({
    data: {
      ...args,
      password,
    },
  });

  const token = jwt.sign({ userId: user.id}, APP_SECRET);

  return { user, token };
};

const login = async (parent, args, context, info) => {
  const user = await context.prisma.user.findUnique({
    where: { email: args.email },
  });

  if(!user) {
      throw new Error("User not found");
  }

  const validate = await bcrypt.compare(args.password, user.password);
  if(!validate) {
      throw new Error("Invalid Password")
  }

  const token = jwt.sign({ userId: user.id}, APP_SECRET)

  return {user, token}
};

const post = async (parent, args, context) => {
  const { userId } = context;
    return await context.prisma.link.create({
        data: {
            description: args.description,
            url: args.url,
            postedBy: { connect: {id: userId}}
        }
    });
}

module.exports = { signup, login, post}
