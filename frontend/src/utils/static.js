import { Badge } from 'antd';
import moment from 'moment';

export const siteNames = [
  "Prestige",
  "Couristan",
  "FibreWorks",
  "Kaya"
]

export const settings = {
  couristan: {
    columns: [
      {
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
              <a style={{ textTransform: 'uppercase', marginLeft: 20 }} key = "2" href={url} target="_blank" rel="noopener noreferrer">{productSku}</a>
            </>
          );
        },
        fixed: "left",
        align: "center"
      },
      {
        title: 'Product Name',
        dataIndex: 'productName',
        key: 'productName',
        width: 140,
        render: (productName, record) => {
          return <div style={{ textAlign: 'center' }}>
            <a style={{ textAlign: 'center', textTransform: 'uppercase' }} href={record.url + '?sku=' + record.productSku} target="_blank" rel="noopener noreferrer">{productName}</a>
          </div>
        },
        align: "center"
      },
      {
        title: 'Color',
        dataIndex: 'color',
        key: 'color',
        width: 100,
        render: color => <span style={{ textTransform: 'uppercase' }}>{color}</span>,
        align: "center"
      },
      {
        title: 'Category',
        width: 100,
        dataIndex: 'category',
        key: 'category',
        align: "center"
      },
      {
        title: 'Brand Name',
        dataIndex: 'brandName',
        key: 'brandName',
        width: 150,
        align: "center"
      },
      {
        title: 'Construction',
        dataIndex: 'construction',
        key: 'construction',
        width: 150,
        align: "center",
      },
      {
        title: 'Width',
        dataIndex: 'width',
        key: 'width',
        width: 150,
        align: "center"
      },
      {
        title: 'Repeat',
        dataIndex: 'repeat',
        key: 'repeat',
        width: 150,
        align: "center"
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        width: 150,
        render: date => <span style={{ textTransform: 'uppercase' }}>{moment(date).format("YYYY-MM-DD")}</span>,
        align: "center"
      },
      {
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

    ],
    api: [
      "couristan/get_products_info",
      "couristan/start_scraping",
    ]
  },
  prestige: {
    columns: [
      {
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
      },
      {
        title: 'Product Name',
        dataIndex: 'productName',
        key: 'productName',
        width: 140,
        render: (productName, record) => {
          return <div style={{ textAlign: 'center' }}>
            <a style={{ textAlign: 'center', textTransform: 'uppercase' }} href={record.url + '?sku=' + record.productSku} target="_blank" rel="noopener noreferrer">{productName}</a>
          </div>
        },
        align: "center"
      },
      {
        title: 'Color',
        dataIndex: 'color',
        key: 'color',
        width: 100,
        render: color => <span style={{ textTransform: 'uppercase' }}>{color}</span>,
        align: "center"
      },
      {
        title: 'Category',
        width: 100,
        dataIndex: 'category',
        key: 'category',
        align: "center"
      },
      {
        title: 'Brand Name',
        dataIndex: 'brandName',
        key: 'brandName',
        width: 150,
        align: "center"
      },
      {
        title: 'Collection',
        dataIndex: 'collection',
        key: 'collection',
        width: 150,
        align: "center"
      },
      {
        title: 'Texture',
        dataIndex: 'texture',
        key: 'texture',
        width: 150,
        align: "center"
      },
      {
        title: 'Fiber',
        dataIndex: 'fiberType',
        key: 'fiberType',
        width: 150,
        align: "center"
      },
      {
        title: 'Construction',
        dataIndex: 'construction',
        key: 'construction',
        width: 150,
        align: "center"
      },
      {
        title: 'Origin',
        dataIndex: 'origin',
        key: 'origin',
        width: 150,
        align: "center"
      },
      {
        title: 'Width',
        dataIndex: 'width',
        key: 'width',
        width: 150,
        align: "center"
      },
      {
        title: 'Repeat Width',
        dataIndex: 'repeatWidth',
        key: 'repeatWidth',
        width: 150,
        align: "center"
      },
      {
        title: 'Repeat Length',
        dataIndex: 'repeatLength',
        key: 'repeatLength',
        width: 150,
        align: "center"
      },
      {
        title: 'Roll Width',
        dataIndex: 'rollWidth',
        key: 'rollWidth',
        width: 150,
        align: "center"
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        width: 150,
        render: date => <span style={{ textTransform: 'uppercase' }}>{moment(date).format("YYYY-MM-DD")}</span>,
        align: "center"
      },
      {
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

    ],
    api: [
      "prestige/get_products_info",
      "prestige/start_scraping",
    ]
  },
  fibreworks: {
    columns: [
      {
        title: 'Product Sku',
        dataIndex: 'productSku',
        key: 'productSku',
        width: 150,
        render: (text, record) => {
          const { productSku, url, addRemove } = record;
          const ribbonText = addRemove === "new" ? "New" : addRemove === "deleted" ? "Removed" : false;
          const ribbonColor = addRemove === "new" ? "green" : addRemove === "deleted" ? "red" : null; // Default color
          return (
            <>
              {
                ribbonText && (
                  <>
                    <Badge.Ribbon key="1" style={{ marginTop: "-40px", marginLeft: "-17px" }} color={ribbonColor} text={ribbonText} placement='start'></Badge.Ribbon>
                  </>
                )
              }
              <a style={{ textTransform: 'uppercase', marginLeft: 20 }} key ="2" href={url} target="_blank" rel="noopener noreferrer">{productSku}</a>
            </>
          );
        },
        fixed: "left",
        align: "center"
      },
      {
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
      },
      {
        title: 'Color',
        dataIndex: 'color',
        key: 'color',
        width: 100,
        render: color => <span style={{ textTransform: 'uppercase' }}>{color}</span>,
        align: "center"
      },
      {
        title: 'Category',
        width: 100,
        dataIndex: 'category',
        key: 'category',
        align: "center"
      },
      {
        title: 'Brand Name',
        dataIndex: 'brandName',
        key: 'brandName',
        width: 150,
        align: "center"
      },
      {
        title: 'Collection',
        dataIndex: 'collection',
        key: 'collection',
        width: 150,
        align: "center"
      },
      {
        title: 'Fiber',
        dataIndex: 'fiberType',
        key: 'fiberType',
        width: 150,
        align: "center"
      },

      {
        title: 'Width',
        dataIndex: 'width',
        key: 'width',
        width: 150,
        align: "center"
      },
      {
        title: 'Family',
        dataIndex: 'family',
        key: 'family',
        width: 150,
        align: "center"
      },
      {
        title: 'Pattern',
        dataIndex: 'pattern',
        key: 'pattern',
        width: 150,
        align: "center"
      },
      {
        title: 'Pattern Repeat',
        dataIndex: 'patternRepeat',
        key: 'patternRepeat',
        width: 150,
        align: "center"
      },
      {
        title: 'Fiber Composition',
        dataIndex: 'fiberComposition',
        key: 'fiberComposition',
        width: 150,
        align: "center"
      },
      {
        title: 'Backing',
        dataIndex: 'backing',
        key: 'backing',
        width: 150,
        align: "center"
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        width: 150,
        render: date => <span style={{ textTransform: 'uppercase' }}>{moment(date).format("YYYY-MM-DD")}</span>,
        align: "center"
      },
      {
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

    ],
    api: [
      "fibreworks/get_products_info",
      "fibreworks/start_scraping",
    ]
  },
  kaya: {
    columns: [
      {
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
              <a style={{ textTransform: 'uppercase', marginLeft: 20 }} key = "2" href={url} target="_blank" rel="noopener noreferrer">{productSku}</a>
            </>
          );
        },
        fixed: "left",
        align: "center"
      },
      {
        title: 'Product Name',
        dataIndex: 'productName',
        key: 'productName',
        width: 140,
        render: (productName, record) => {
          return <div style={{ textAlign: 'center' }}>
            <a style={{ textAlign: 'center', textTransform: 'uppercase' }} href={record.url + '?sku=' + record.productSku} target="_blank" rel="noopener noreferrer">{productName}</a>
          </div>
        },
        align: "center"
      },
      {
        title: 'Color',
        dataIndex: 'color',
        key: 'color',
        width: 100,
        render: color => <span style={{ textTransform: 'uppercase' }}>{color}</span>,
        align: "center"
      },
      {
        title: 'Category',
        width: 100,
        dataIndex: 'category',
        key: 'category',
        align: "center"
      },
      {
        title: 'Brand Name',
        dataIndex: 'brandName',
        key: 'brandName',
        width: 150,
        align: "center"
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        width: 150,
        render: date => <span style={{ textTransform: 'uppercase' }}>{moment(date).format("YYYY-MM-DD")}</span>,
        align: "center"
      },
      {
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

    ],
    api: [
      "kaya/get_products_info",
      "kaya/start_scraping",
    ]
  }
}