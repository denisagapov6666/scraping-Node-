import { Badge } from 'antd';
import moment from 'moment';

export const siteNames = [
  "Prestige",
  "Couristan",
  "FibreWorks",
  "Kaya",
  "Bloomsburg",
  "Harcourt",
  "Nourison",
  "Kaleen",
  "Fabrica",
  "Dixie",
  "Masland",
  "AndersonTuftex",
  "Wicanders",
  "ShawFloors",
  "HardWood",
  "Adorra",
  "Rebel",
  "Mohawk"
]
const product_sku1 = {
  title: 'Product Sku',
  dataIndex: 'productSku',
  key: 'productSku',
  width: 150,
  render: (text, record) => {
    const { productSku, url, addRemove } = record;
    const ribbonText = addRemove === "new" ? "New" : addRemove === "deleted" ? "Removed" : false;
    const ribbonColor = addRemove === "new" ? "green" : addRemove === "deleted" ? "red" : ""; // Default color
    return (
      <>
        {
          ribbonText && (
            <>
              <Badge.Ribbon key = "1" style={{ marginTop: "-40px", marginLeft: "-17px" }} color={ribbonColor} text={ribbonText} placement='start'></Badge.Ribbon>
            </>
          )
        }
        <a style={{ textTransform: 'uppercase', marginLeft: 20 }} key = "2" href={url+"?sku="+productSku} target="_blank" rel="noopener noreferrer">{productSku}</a>
      </>
    );
  },
  fixed: "left",
  align: "center"
}
const product_sku = {
  title: 'Product Sku',
  dataIndex: 'productSku',
  key: 'productSku',
  width: 150,
  render: (text, record) => {
    const { productSku, url, addRemove } = record;
    const ribbonText = addRemove === "new" ? "New" : addRemove === "deleted" ? "Removed" : false;
    const ribbonColor = addRemove === "new" ? "green" : addRemove === "deleted" ? "red" : ""; // Default color
    return (
      <>
        {
          ribbonText && (
            <>
              <Badge.Ribbon key="1" style={{ marginTop: "-40px", marginLeft: "-17px" }} color={ribbonColor} text={ribbonText} placement='start'></Badge.Ribbon>
            </>
          )
        }
        <a style={{ textTransform: 'uppercase', marginLeft: 20 }} key="2" href={url} target="_blank" rel="noopener noreferrer">{productSku}</a>
      </>
    );
  },
  fixed: "left",
  align: "center"
}
const product_name = {
  title: 'Product Name',
  dataIndex: 'productName',
  key: 'productName',
  width: 140,
  render: (productName, record) => {
    return <div style={{ textAlign: 'center' }}>
      <a style={{ textAlign: 'center', textTransform: 'uppercase' }} href={record.url} target="_blank" rel="noopener noreferrer">{productName}</a>
    </div>
  },
  align: "center"
}
const color = {
  title: 'Color',
  dataIndex: 'color',
  key: 'color',
  width: 100,
  render: color => <span style={{ textTransform: 'uppercase' }}>{color}</span>,
  align: "center"
}
const category = {
  title: 'Category',
  width: 100,
  dataIndex: 'category',
  key: 'category',
  align: "center"
}
const brand_name = {
  title: 'Brand Name',
  dataIndex: 'brandName',
  key: 'brandName',
  width: 150,
  align: "center"
}
const construction = {
  title: 'Construction',
  dataIndex: 'construction',
  key: 'construction',
  width: 150,
  align: "center",
}
const width = {
  title: 'Width',
  dataIndex: 'width',
  key: 'width',
  width: 150,
  align: "center"
}
const repeat = {
  title: 'Repeat',
  dataIndex: 'repeat',
  key: 'repeat',
  width: 150,
  align: "center"
}
const date = {
  title: 'Date',
  dataIndex: 'date',
  key: 'date',
  width: 150,
  render: date => <span style={{ textTransform: 'uppercase' }}>{moment(date).format("YYYY-MM-DD")}</span>,
  align: "center"
}
const images = {
  title: 'Images',
  dataIndex: 'imageUrls',
  key: 'imageUrls',
  width: 120,
  render: (imageUrls) => {
    // Render all images except the first one inside an anchor tag with a unique key
    return (
      <div style={{ width: "100px", textAlign: "center", margin: "auto" }}>
        {imageUrls.slice(0).map((image, index) => (
          // Use the combination of image URL and index as a unique key
          <a key={image + index} href={image} target="_blank" rel="noopener noreferrer">
            <img width="40px" height="40px" src={image} alt={`product-${index}`} style={{ margin: '3px' }} />
          </a>
        ))}
      </div>
    );
  },
  fixed: "right",
  align: "center"
}
const collection = {
  title: 'Collection',
  dataIndex: 'collection',
  key: 'collection',
  width: 150,
  align: "center"
}
const texture =  {
  title: 'Texture',
  dataIndex: 'texture',
  key: 'texture',
  width: 150,
  align: "center"
}
const fiber = {
  title: 'Fiber',
  dataIndex: 'fiberType',
  key: 'fiberType',
  width: 150,
  align: "center"
}
const origin =  {
  title: 'Origin',
  dataIndex: 'origin',
  key: 'origin',
  width: 150,
  align: "center"
}
const repeat_width = {
  title: 'Repeat Width',
  dataIndex: 'repeatWidth',
  key: 'repeatWidth',
  width: 150,
  align: "center"
}
const repeat_length =  {
  title: 'Repeat Length',
  dataIndex: 'repeatLength',
  key: 'repeatLength',
  width: 150,
  align: "center"
}
const roll_width = {
  title: 'Roll Width',
  dataIndex: 'rollWidth',
  key: 'rollWidth',
  width: 150,
  align: "center"
}
const family = {
  title: 'Family',
  dataIndex: 'family',
  key: 'family',
  width: 150,
  align: "center"
}
const pattern = {
  title: 'Pattern',
  dataIndex: 'pattern',
  key: 'pattern',
  width: 150,
  align: "center"
}
const pattern_repeat = {
  title: 'Pattern Repeat',
  dataIndex: 'patternRepeat',
  key: 'patternRepeat',
  width: 150,
  align: "center"
}
const fiber_composition = {
  title: 'Fiber Composition',
  dataIndex: 'fiberComposition',
  key: 'fiberComposition',
  width: 150,
  align: "center"
}
const backing = {
  title: 'Backing',
  dataIndex: 'backing',
  key: 'backing',
  width: 150,
  align: "center"
}
const material = {
  title: 'Material',
  dataIndex: 'backing',
  key: 'backing',
  width: 150,
  align: "center"
}
const yarn = {
  title: 'Yarn',
  dataIndex: 'yarn',
  key: 'yarn',
  width: 150,
  align: "center"
}
const fire_rating = {
  title: 'Fire Rating',
  dataIndex: 'fireRating',
  key: 'fireRating',
  width: 150,
  align: "center"
}
const weight = {
  title: 'Weight',
  dataIndex: 'weight',
  key: 'weight',
  width: 150,
  align: "center"
}
const application = {
  title: 'Application',
  dataIndex: 'usage',
  key: 'usage',
  width: 150,
  align: "center"
}
const height = {
  title: 'Height',
  dataIndex: 'height',
  key: 'height',
  width: 150,
  align: "center"
}
const price = {
  title: 'Price',
  dataIndex: 'price',
  key: 'price',
  width: 150,
  align: "center"
}
const style = {
  title: 'Style',
  dataIndex: 'style',
  key: 'style',
  width: 150,
  align: "center"
}
const dimension = {
  title: 'Dimension',
  dataIndex: 'dimension',
  key: 'dimension',
  width: 150,
  align: "center"
}  
const thickness = {
  title: 'Thickness',
  dataIndex: 'thickness',
  key: 'thickness',
  width: 150,
  align: "center"
}
const bevel = {
  title: 'Bevel',
  dataIndex: 'bevel',
  key: 'bevel',
  width: 150,
  align: "center"
}
const finishing = {
  title: 'Finishing',
  dataIndex: 'finishing',
  key: 'finishing',
  width: 150,
  align: "center"
}
const looking_system = {
  title: 'Locking System',
  dataIndex: 'lockingSystem',
  key: 'lockingSystem',
  width: 150,
  align: "center"
}
const warranty = {
  title: 'Warranty',
  dataIndex: 'warranty',
  key: 'warranty',
  width: 150,
  align: "center"
}
const stain_treatment = {
  title: 'Stain Treatment',
  dataIndex: 'stainTreatment',
  key: 'stainTreatment',
  width: 150,
  align: "center"
}
const finish = {
  title: 'Finish',
  dataIndex: 'finish',
  key: 'finish',
  width: 150,
  align: "center"
}
const coverage = {
  title: 'Coverage',
  dataIndex: 'coverage',
  key: 'coverage',
  width: 150,
  align: "center"
}
const product_name1 = {
  title: 'Product Name',
  dataIndex: 'productName',
  key: 'productName',
  width: 150,
  render: (text, record) => {
    const { productName, url, addRemove } = record;
    const ribbonText = addRemove === "new" ? "New" : addRemove === "deleted" ? "Removed" : false;
    const ribbonColor = addRemove === "new" ? "green" : addRemove === "deleted" ? "red" : ""; // Default color
    return (
      <>
        {
          ribbonText && (
            <>
              <Badge.Ribbon key="1" style={{ marginTop: "-40px", marginLeft: "-17px" }} color={ribbonColor} text={ribbonText} placement='start'></Badge.Ribbon>
            </>
          )
        }
        <a style={{ textTransform: 'uppercase', marginLeft: 20 }} key="2" href={url} target="_blank" rel="noopener noreferrer">{productName}</a>
      </>
    );
  },
  fixed: "left",
  align: "center"
}
export const settings = {
  couristan: {
    columns: [
      product_sku,
      product_name,
      color,
      category,
      brand_name,
      construction,
      width,
      repeat,
      date,
      images
    ],
    api: [
      "couristan/get_products_info",
      "couristan/start_scraping",
      "couristan/cron",
    ]
  },
  prestige: {
    columns: [
      product_sku1,
      product_name,
      color,
      category,
      brand_name,
      collection,
      texture,
      fiber,
      construction,
      origin,
      width,
      repeat_width,
      repeat_length,
      roll_width,
      date,
      images
    ],
    api: [
      "prestige/get_products_info",
      "prestige/start_scraping",
      "prestige/cron",
    ]
  },
  fibreworks: {
    columns: [
      product_sku,
      product_name,
      color,
      category,
      brand_name,
      collection,
      fiber,
      width,
      family,
      pattern,
      pattern_repeat,
      fiber_composition,
      backing,
      date,
      images
    ],
    api: [
      "fibreworks/get_products_info",
      "fibreworks/start_scraping",
      "fibreworks/cron",
    ]
  },
  kaya: {
    columns: [
      product_sku,
      product_name,
      color,
      category,
      brand_name,
      date,
      images
    ],
    api: [
      "kaya/get_products_info",
      "kaya/start_scraping",
      "kaya/cron",
    ]
  },
  bloomsburg: {
    columns: [
      product_sku,
      product_name,
      color,
      category,
      brand_name,
      collection,
      width,
      yarn,
      material,
      construction,
      fire_rating,
      weight,
      repeat,
      date,
      images

    ],
    api: [
      "bloomsburg/get_products_info",
      "bloomsburg/start_scraping",
      "bloomsburg/cron",
    ]
  },
  harcourt: {
    columns: [
      product_sku,
      product_name,
      color,
      category,
      brand_name,
      collection,
      fiber,
      construction,
      origin,
      width,
      pattern_repeat,
      date,
      images

    ],
    api: [
      "harcourt/get_products_info",
      "harcourt/start_scraping",
      "harcourt/cron",
    ]
  },
  nourison: {
    columns: [
      product_sku,
      product_name,
      category,
      brand_name,
      collection,
      fiber,
      construction,
      origin,
      weight,
      application,
      pattern_repeat,
      date,
      images

    ],
    api: [
      "nourison/get_products_info",
      "nourison/start_scraping",
      "nourison/cron",
    ]
  },
  kaleen: {
    columns: [
      product_sku,
      product_name,
      category,
      brand_name,
      collection,
      fiber,
      construction,
      application,
      width,
      pattern,
      height,
      date,
      images

    ],
    api: [
      "kaleen/get_products_info",
      "kaleen/start_scraping",
      "kaleen/cron",
    ]
  },
  fabrica: {
    columns: [
      product_sku,
      product_name,
      category,
      brand_name,
      color,
      collection,
      fiber,
      construction,
      price,
      origin,
      width,
      pattern_repeat,
      style,
      backing,
      date,
      images
    ],
    api: [
      "fabrica/get_products_info",
      "fabrica/start_scraping",
      "fabrica/cron",
    ]
  },
  dixie: {
    columns: [
      product_sku,
      product_name,
      category,
      brand_name,
      color,
      collection,
      fiber,
      construction,
      price,
      origin,
      width,
      pattern_repeat,
      style,
      backing,
      date,
      images
    ],
    api: [
      "dixie/get_products_info",
      "dixie/start_scraping",
      "dixie/cron",
    ]
  },
  masland: {
    columns: [
      product_sku,
      product_name,
      category,
      brand_name,
      color,
      collection,
      fiber,
      construction,
      price,
      origin,
      width,
      pattern_repeat,
      style,
      backing,
      date,
      images
    ],
    api: [
      "masland/get_products_info",
      "masland/start_scraping",
      "masland/cron",
    ]
  },
  andersontuftex: {
    columns: [
      product_sku,
      product_name,
      category,
      brand_name,
      color,
      collection,
      fiber,      
      width,
      style,
      backing,
      date,
      images
    ],
    api: [
      "andersontuftex/get_products_info",
      "andersontuftex/start_scraping",
      "andersontuftex/cron",
    ]
  },
  wicanders: {
    columns: [
      product_sku,
      product_name,
      category,
      brand_name,
      collection,
      dimension,      
      thickness,
      bevel,
      warranty,
      finishing,
      looking_system,
      date,
      images

    ],
    api: [
      "wicanders/get_products_info",
      "wicanders/start_scraping",
      "wicanders/cron",
    ]
  },
  shawfloors: {
    columns: [
      product_sku,
      product_name,
      category,
      brand_name,
      color,
      collection,
      style,
      texture,
      fiber,
      width,
      backing,
      weight,
      stain_treatment,
      date,
      images

    ],
    api: [
      "shawfloors/get_products_info",
      "shawfloors/start_scraping",
      "shawfloors/cron",
    ]
  },
  hardwood: {
    columns: [
      product_sku,
      product_name,
      category,
      brand_name,
      color,
      collection,      
      style,
      width,
      height,
      construction,
      finish,
      coverage,
      thickness,
      date,
      images

    ],
    api: [
      "hardwood/get_products_info",
      "hardwood/start_scraping",
      "hardwood/cron",
    ]
  },
  adorra: {
    columns: [
      product_sku,
      product_name,
      category,
      brand_name,
      color,
      collection,
      width,
      construction,
      fiber,
      date,
      images

    ],
    api: [
      "adorra/get_products_info",
      "adorra/start_scraping",
      "adorra/cron",
    ]
  },
  rebel: {
    columns: [
      product_name1,
      category,
      brand_name,
      color,
      collection,
      width,
      fiber,
      texture,
      origin,
      pattern_repeat,
      date,
      images

    ],
    api: [
      "rebel/get_products_info",
      "rebel/start_scraping",
      "rebel/cron",
    ]
  },
  mohawk: {
    columns: [
      product_sku,
      category,
      brand_name,
      color,
      collection,        
      style,
      origin,
      {
        title: 'Feature',
        dataIndex: 'feature',
        key: 'feature',
        width: 150,
        align: "center"
      },
      {
        title: 'Install Method',
        dataIndex: 'installMethod',
        key: 'installMethod',
        width: 150,
        align: "center"
      },
      
    
      date,
      images

    ],
    api: [
      "mohawk/get_products_info",
      "mohawk/start_scraping",
      "mohawk/cron",
    ]
  },
}