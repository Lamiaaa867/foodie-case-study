import { Schema, model } from 'mongoose'

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    dishes: [
      {
        dishId: {
          type: Schema.Types.ObjectId,
          ref: 'dish',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        finalPrice: {
          type: Number,
          required: true,
        },
      },
    ],
    subTotal: {
      type: Number,
      required: true,
      default: 0,
    },
   
    paidAmount: {
      type: Number,
      required: true,
      default: 0,
    },

    address: { type: String, required: true },
    phoneNumbers: [{ type: String, required: true }],

    orderStatus: {
      type: String,
      enum: [
        'placed',
        'on way',
        'confirmed',
        'delivered',
        'pending',
        'canceled',
        'rejected',
      ],
    },

    paymentMethod: {
      type: String,
      enum: ['cash', 'card'],
      required: true,
    },

    cancelledBy: { type: Schema.Types.ObjectId, ref: 'user' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'user' },

    reason: String,
  },
  {
    timestamps: true,
  },
)

export const orderModel = model('order', orderSchema)
