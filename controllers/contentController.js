const { Content, User } = require('../models');
const responseUtil = require('../utils/response');

exports.createContent = async (req, res) => {
  const { title, body } = req.body;
  try {
    const content = await Content.create({ title, body, userId: req.user.id }); // req.user dari middleware
    res.status(201).json(responseUtil.success(201, 'Content created successfully', content));
  } catch (error) {
    res.status(500).json(responseUtil.error(500, error.message));
  }
};

exports.getContents = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Paging: ?page=1&limit=10
  const offset = (page - 1) * limit;
  try {
    const { count, rows } = await Content.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [User], // Join dengan user
      order: [['createdAt', 'DESC']],
    });
    const data = {
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      contents: rows,
    };
    res.json(responseUtil.success(200, 'Contents retrieved successfully', data));
  } catch (error) {
    res.status(500).json(responseUtil.error(500, error.message));
  }
};

exports.getContentById = async (req, res) => {
  try {
    const content = await Content.findByPk(req.params.id, { include: [User] });
    if (!content) return res.status(404).json(responseUtil.error(404, 'Content not found'));
    res.json(responseUtil.success(200, 'Content retrieved successfully', content));
  } catch (error) {
    res.status(500).json(responseUtil.error(500, error.message));
  }
};

exports.updateContent = async (req, res) => {
  const { title, body } = req.body;
  try {
    const content = await Content.findByPk(req.params.id);
    if (!content || content.userId !== req.user.id) return res.status(403).json(responseUtil.error(403, 'Unauthorized'));
    await content.update({ title, body });
    res.json(responseUtil.success(200, 'Content updated successfully', content));
  } catch (error) {
    res.status(500).json(responseUtil.error(500, error.message));
  }
};

exports.deleteContent = async (req, res) => {
  try {
    const content = await Content.findByPk(req.params.id);
    if (!content || content.userId !== req.user.id) return res.status(403).json(responseUtil.error(403, 'Unauthorized'));
    await content.destroy();
    res.json(responseUtil.success(200, 'Content deleted successfully'));
  } catch (error) {
    res.status(500).json(responseUtil.error(500, error.message));
  }
};
