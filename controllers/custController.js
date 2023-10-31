const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { Customer, Bookmark, Lodging, Type } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const { Op } = require("sequelize");
const axios = require("axios");
class custController {
  static async registerCust(req, res, next) {
    try {
      const { email, password } = req.body;
      const customer = await Customer.create({
        email,
        password,
        imageUrl: "https://source.boringavatars.com/beam/120/?square",
      });
      res.status(201).json({ message: "succesfully registered" });
    } catch (err) {
      next(err);
    }
  }

  static async loginCust(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw { name: "InvalidInput" };

      const customer = await Customer.findOne({ where: { email } });
      if (!customer) throw { name: "InvalidEmail/Password" };

      const isValidPassword = comparePassword(password, customer.password);
      if (!isValidPassword) throw { name: "InvalidEmail/Password" };

      const access_token = signToken({ id: customer.id });
      res.status(200).json({
        access_token,
        id: customer.id,
        email: customer.email,
        imageUrl: customer.imageUrl,
      });
    } catch (err) {
      next(err);
    }
  }

  static async loginGoogleCust(req, res, next) {
    try {
      const { google_token } = req.headers;
      const client = new OAuth2Client();

      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      // console.log(ticket)

      const [customer, created] = await Customer.findOrCreate({
        where: { email: ticket.payload.email },
        defaults: {
          email: ticket.payload.email,
          password: Math.random() * 12345,
          role: "customer",
          imageUrl: ticket.payload.picture,
        },
        hooks: false,
      });

      const access_token = signToken({
        id: customer.id,
      });
      res.status(200).json({
        access_token,
        id: customer.id,
        email: customer.email,
        imageUrl: customer.imageUrl,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async fetchLodgingCust(req, res, next) {
    const { category, name, location, page } = req.query;

    let limit;
    let offset;
    const option = {
      include: [
        {
          model: Type,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: [["id"]],
      where: {
        status: "Active",
      },
    };

    // categorying by category
    if (category !== "" && typeof category !== "undefined") {
      option.where.typeId = category;
    }

    // search
    if (name !== "" && typeof name !== "undefined") {
      option.where.name = { [Op.iLike]: `%${name}%` };
    }

    if (location !== "" && typeof location !== "undefined") {
      option.where.location = { [Op.iLike]: `%${location}%` };
    }

    //pagination
    if (page !== "" && typeof page !== "undefined") {
      if (page.size !== "" && typeof page.size !== "undefined") {
        limit = page.size;
        option.limit = limit;
      }

      if (page.number !== "" && typeof page.number !== "undefined") {
        offset = page.number * limit - limit;
        option.offset = offset;
      }
    } else {
      limit = 9; // limit 5 item
      offset = 0;
      option.limit = limit;
      option.offset = offset;
    }

    try {
      const lodging = await Lodging.findAll(option);
      res.status(200).json({ total: lodging.length, lodging });
    } catch (err) {
      next(err);
    }
  }

  static async getLodgingById(req, res, next) {
    try {
      const base_url = "https://turu-client.web.app";
      const API_KEY = process.env.API_KEY;

      const qrCode = {
        url: `https://api.qr-code-generator.com/v1/create?access-token=${API_KEY}`,
        method: "post",
        data: {
          frame_name: "no-frame",
          qr_code_text: `${base_url}/detail/${req.params.id}`,
          image_format: "SVG",
          qr_code_logo: "scan-me-square",
        },
      };

      const lodging = await Lodging.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: Type,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      if (!lodging) throw { name: "NotFound" };

      const response = await axios.request(qrCode);
      // console.log(response)
      res.status(200).json({ lodging, qr: response.data });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async addBookmark(req, res, next) {
    try {
      let { LodgingId } = req.params;
      const CustomerId = req.user.id;
      LodgingId = +LodgingId;

      const lodging = await Lodging.findByPk(LodgingId);
      if (!lodging) throw { name: "NotFound" };

      const lodgingBookmarked = await Bookmark.findOne({
        where: { LodgingId, CustomerId: req.user.id },
      });
      if (lodgingBookmarked) throw { name: "AlreadyBookmarked" };

      const bookmark = await Bookmark.create({ CustomerId, LodgingId });
      res.status(201).json({ id: bookmark.id, CustomerId, LodgingId });
    } catch (err) {
      next(err);
    }
  }

  static async deleteBookmark(req, res, next) {
    try {
      await Bookmark.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: `success to delete` });
    } catch (err) {
      next(err);
    }
  }

  static async fetchBookmark(req, res, next) {
    try {
      const bookmarks = await Bookmark.findAll({
        include: [
          {
            model: Lodging,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            where: {
              status: "Active",
            },
            include: [
              {
                model: Type,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
            ],
          },
        ],
        order: [["id", "DESC"]],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        where: {
          CustomerId: req.user.id,
        },
      });
      res.status(200).json(bookmarks);
    } catch (err) {
      next(err);
    }
  }

  static async getAllTypes(req, res, next) {
    try {
      const type = await Type.findAll({ order: [["id"]] });
      res.status(200).json({ type });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = custController;
