const { User, Post, FollowAction, Likes, Comments } = require("./models");
const post = require("./models/post");

async function createRecord() {
  // CRUD Operations

  // Create
  const user = await User.create({
    userName: "test",
    email: "vj2k02@gmail.com",
    emailVerifiedAt: Date.now(),
    displayName: "Vijayabaskar",
    bio: "I am a software developer",
    password: "test",
    website: "https://vj2k02.github.io",
    location: "Chennai",
  });

  const post = await Post.create({
    content: "Hello World",
    postedAt: Date.now(),
    userId: user.id,
    repostId: this.id,
    like: Likes.id,
  });

  await FollowAction.create({
    userId: user.id,
    followerId: user.id,
    followAt: Date.now(),
  });

  await Likes.create({
    postId: post.id,
    likedBy: user.id,
    likedAt: Date.now(),
  });

  await Comments.create({
    postId: post.id,
    userId: user.id,
    content: "Hello World",
    commentedAt: Date.now(),
    parentCommentId: this.id,
  });
}

// Retrive or Read

async function ReadData() {
  // Retrive or Read
  const users = await User.findAll();
  const posts = await Post.findAll();
  const followActions = await FollowAction.findAll();
  const likes = await Likes.findAll();
  const comments = await Comments.findAll();
  console.log(
    JSON.stringify(users, null, 2),
    JSON.stringify(posts, null, 2),
    JSON.stringify(followActions, null, 2),
    JSON.stringify(likes, null, 2),
    JSON.stringify(comments, null, 2)
  );
}

async function UpdateData() {
  // Update
  const userupdated = await User.findAll({ where: { id: 1 } });
  console.log("Before Update", JSON.stringify(userupdated, null, 2));
  await User.update(
    { bio: "I am a software Enginner" },
    { where: { id: 1 } }
  ).then(async () => {
    const userupdated = await User.findAll({ where: { id: 1 } });
    console.log("after Update", JSON.stringify(userupdated, null, 2));
  });
}

async function deleteData() {
  // Delete
  const userdeleted = await User.findAll({ where: { id: 1 } });
  console.log("Before Delete", JSON.stringify(userdeleted, null, 2));
  await User.destroy({ where: { id: 1 } }).then(async () => {
    const userdeleted = await User.findAll({ where: { id: 1 } });
    console.log("After Delete", JSON.stringify(userdeleted, null, 2));
  });
}

createRecord();
ReadData();
UpdateData();
deleteData();
