exports.createBlog = async (req, res) => {
  try {
    const { username, userId, image } = req.body;

    if (!username || !userId) {
      return res.status(400).json({ success: false, message: "Username and UserId are required." });
    }

    const newBlog = new Blog(req.body);
    const saveBlog = await newBlog.save();

    res.status(200).json({ success: true, saveBlog, message: "New Blog Saved in DB" });
  } catch (err) {
    console.error("Blog Creation Error:", err.message);
    res.status(500).json({ success: false, message: "Blog Creation Problem" });
  }
};
