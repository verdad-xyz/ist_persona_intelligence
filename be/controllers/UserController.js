import argon2 from "argon2";
import User from "../models/UserModel.js";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing)
      return res.status(400).json({ message: "Email sudah digunakan" });

    await User.create({ name, email, password, role });

    res.status(201).json({ message: "User berhasil dibuat" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Gagal membuat user" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { uuid: req.params.id },
    });
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    const { name, email, password, role } = req.body;

    // Cek apakah email sudah digunakan user lain
    const existing = await User.findOne({ where: { email } });
    if (existing && existing.id !== user.id) {
      return res.status(400).json({ message: "Email sudah digunakan" });
    }

    // Hash password jika diisi, jika tidak pakai password lama
    let hashedPassword = user.password;
    if (password && password !== "") {
      hashedPassword = await argon2.hash(password);
    }

    await user.update({ name, email, password: hashedPassword, role });

    res.status(200).json({ message: "User berhasil diupdate" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Gagal mengupdate user" });
  }
};

export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

  try {
    await User.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "User berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
