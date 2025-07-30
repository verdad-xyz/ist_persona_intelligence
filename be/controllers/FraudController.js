import FraudName from "../models/FraudNameModel.js";
import FraudCategory from "../models/FraudCategoryModel.js";
import User from "../models/UserModel.js";

// Fraud Name
export const getFraudNames = async (req, res) => {
  try {
    const response = await FraudName.findAll({
      include: [
        {
          model: User,
          attributes: ["uuid", "name", "email"],
        },
        { model: FraudCategory, through: { attributes: [] } },
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
    const fraudName = await FraudName.create({ name, userId });

    if (categoryIds && Array.isArray(categoryIds)) {
      await fraudName.setFraudCategories(categoryIds);
    }

    res.status(201).json({ message: "Fraud name berhasil dibuat" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Gagal membuat fraud name" });
  }
};

// Fraud Category
export const getFraudCategories = async (req, res) => {
  try {
    const response = await FraudCategory.findAll();
    res.status(200).json(response);
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
