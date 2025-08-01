import FraudName from "../models/FraudNameModel.js";
import FraudCategory from "../models/FraudCategoryModel.js";
import User from "../models/UserModel.js";

// Name
export const getFraudNames = async (req, res) => {
  try {
    const response = await FraudName.findAll({
      include: [
        {
          model: User,
          attributes: ["uuid", "name", "email"],
        },
        { model: FraudCategory, as: "categories", through: { attributes: [] } },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Gagal mengambil fraud name" });
  }
};

export const createFraudName = async (req, res) => {
  try {
    const { name, userId, categoryIds } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
      return res.status(400).json({ message: "Kategori harus dipilih" });
    }

    const foundCategories = await FraudCategory.findAll({
      where: {
        id: categoryIds,
      },
    });

    if (foundCategories.length !== categoryIds.length) {
      return res.status(400).json({
        message: "Beberapa kategori tidak ditemukan",
        existingCategoryIds: foundCategories.map((c) => c.id),
      });
    }

    const fraudName = await FraudName.create({ name, userId });

    await fraudName.setCategories(categoryIds);

    res.status(201).json({ message: "Fraud name berhasil dibuat" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Gagal membuat fraud name" });
  }
};

export const getFraudNameById = async (req, res) => {
  try {
    const fraudName = await FraudName.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["uuid", "name", "email"],
        },
        {
          model: FraudCategory,
          as: "categories",
          through: { attributes: [] },
        },
      ],
    });

    if (!fraudName)
      return res.status(404).json({ message: "Fraud name tidak ditemukan" });

    res.status(200).json(fraudName);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Gagal mengambil data" });
  }
};

export const updateFraudName = async (req, res) => {
  try {
    const { name, userId, categoryIds } = req.body;

    const fraudName = await FraudName.findByPk(req.params.id);
    if (!fraudName)
      return res.status(404).json({ message: "Fraud name tidak ditemukan" });

    const existing = await FraudName.findOne({
      where: { name },
    });
    if (existing && existing.id !== fraudName.id)
      return res.status(400).json({ message: "Nama fraud sudah digunakan" });

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    const foundCategories = await FraudCategory.findAll({
      where: { id: categoryIds },
    });
    if (foundCategories.length !== categoryIds.length) {
      return res.status(400).json({ message: "Beberapa kategori tidak valid" });
    }

    await fraudName.update({ name, userId });
    await fraudName.setCategories(categoryIds);

    res.status(200).json({ message: "Fraud name berhasil diupdate" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Gagal mengupdate fraud name" });
  }
};

export const deleteFraudName = async (req, res) => {
  try {
    const fraudName = await FraudName.findByPk(req.params.id);
    if (!fraudName)
      return res.status(404).json({ message: "Fraud name tidak ditemukan" });

    await fraudName.setCategories([]);
    await fraudName.destroy();

    res.status(200).json({ message: "Fraud name berhasil dihapus" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Gagal menghapus fraud name" });
  }
};

// Category
export const getFraudCategories = async (req, res) => {
  try {
    const response = await FraudCategory.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Gagal mengambil kategori" });
  }
};

export const getFraudCategoryById = async (req, res) => {
  try {
    const category = await FraudCategory.findByPk(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Kategori tidak ditemukan" });
    res.status(200).json(category);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Gagal mengambil kategori" });
  }
};

export const createFraudCategory = async (req, res) => {
  try {
    const { name } = req.body;
    await FraudCategory.create({ name });
    res.status(201).json({ message: "Kategori berhasil ditambahkan" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Gagal menambahkan kategori" });
  }
};

export const updateFraudCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await FraudCategory.findByPk(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Kategori tidak ditemukan" });

    const existing = await FraudCategory.findOne({
      where: { name },
    });

    if (existing && existing.id !== category.id) {
      return res.status(409).json({ message: "Nama kategori sudah digunakan" });
    }

    category.name = name;
    await category.save();

    res.status(200).json({ message: "Kategori berhasil diperbarui" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Gagal memperbarui kategori" });
  }
};

export const deleteFraudCategory = async (req, res) => {
  try {
    const category = await FraudCategory.findByPk(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Kategori tidak ditemukan" });

    await category.destroy();
    res.status(200).json({ message: "Kategori berhasil dihapus" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Gagal menghapus kategori" });
  }
};
