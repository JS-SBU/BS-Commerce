export class IProductSearchSchema {
  infoProductId: string;
  infoName: string;
  infoShortDescription: string;
  infoFullDescription: string;
  infoSku: string;
  infoPrice: number;
  metaKeywords: any;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  photos: string[];
  brands: any;
  manufacturer: any;
  categories: any;
}

export const productSearchSchema = {
  infoProductId: {
    type: 'text',
  },
  infoName: {
    type: 'text',
    weight: 5,
  },
  infoShortDescription: {
    type: 'text',
    weight: 4,
  },
  infoFullDescription: {
    type: 'text',
    weight: 3,
  },
  infoSku: {
    type: 'text',
  },
  infoPrice: {
    type: 'integer',
  },
  metaKeywords: {
    type: 'text',
  },
  metaTitle: {
    type: 'text',
  },
  metaDescription: {
    type: 'text',
    weight: 3,
  },
  tags: {
    type: 'text',
  },
  photos: {
    type: 'text',
  },
  brands: {
    type: 'text',
  },
  manufacturer: {
    properties: {
      id: {
        type: 'text',
      },
      name: {
        type: 'text',
      },
    },
  },
  categories: {
    type: 'nested',
  },
};
