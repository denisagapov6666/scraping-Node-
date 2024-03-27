import React, { useState, useEffect, useRef } from 'react';
import { Table, message, Select, Button, Input, DatePicker, Modal } from 'antd';
import axios from 'axios';
import { Excel } from "antd-table-saveas-excel";
import moment from 'moment';
import { settings } from '../utils/static'
import 'antd/dist/reset.css';
const { RangePicker } = DatePicker;

const MainTable = ({current, getBadgeData}) => {
  
  const columns = settings[current.toString().toLowerCase()].columns
  const tableRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [originData, setOriginData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    pageSizeOptions: [20, 50, 100]
  })
  const [history, setHistory] = useState([]);
  const [modalData, setModalData] = useState([]);
  const [finalScrapingDate, setFinalScrapingDate] = useState('');
  const [noDataMessage, setNoDataMessage] = useState('');

  useEffect(() => {

    setLoading(true)
    axios.get(`https://scrapingback.onrender.com/${settings[current.toString().toLowerCase()].api[0]}`)
      .then(async res => {
        setHistory(res.data.data.history)
        const historyLength = res.data.data.history.length;
        if(historyLength>0){
          const lastHistoryDate = res.data.data.history[historyLength - 1].createdAt;
          const finalScrapingDate = moment(lastHistoryDate).format("MMM DD YYYY");
          setFinalScrapingDate(finalScrapingDate);
        }
        getBadgeData(res.data.newdeleteamount);
        // Make sure `res.data.total` correctly represents the total number of items available in the backend
        setPagination(prevPagination => ({
          ...prevPagination,
          total: res.data.data.total, // This should be the total number of items, not the number of items in the current page
          pageSizeOptions: res.data.data.total > 100 ? [20, 50, 100, res.data.data.total] : [20, 50, 100],
        }));
        setOriginData(res.data.data.products);
        setData(res.data.data.products);
        setLoading(false);
      });

  }, [current])

  const handleChange = (current, pageSize) => {
    setPagination({ ...pagination, current, pageSize })
  };
  const handleStartScraping = async () => {
    setLoading(true);
    info();

    axios.get(`https://scrapingback.onrender.com/${settings[current.toString().toLowerCase()].api[1]}`)
      .then(async res => {
        getBadgeData(res.data.newdeleteamount);
        if (res.data.success) {
          setHistory(res.data.data.history)
          setFinalScrapingDate(moment(res.data.data.history[res.data.data.history.length - 1].createdAt).format("MMM DD YYYY"))
          setLoading(false);
          setData(res.data.data.products);
          setOriginData(res.data.data.products);
          setPagination(prevPagination => ({
            ...prevPagination,
            total: res.data.data.total, // This should be the total number of items, not the number of items in the current page
            pageSizeOptions: res.data.data.total > 100 ? [20, 50, 100, res.data.data.total] : [20, 50, 100],
          }));
          success(`${res.data.data.new} Product(s) is(are) added and ${res.data.data.removed} Product(s) is(are) removed.`);
          // await setTimeout(window.location.reload(),3000);
        } else {
          setLoading(false);
          message.warning({
            content: res.data.message,
            style: {
              marginTop: "20vh"
            },
            duration: 5
          });
        }
      })
  }
  const handleDownloadClick = () => {
    const excel = new Excel();

    // Define columns for Excel
    const excelColumns = columns
      .filter(column => column.title !== 'Thumb Image' && column.title !== 'Other Images') // Exclude Thumb Image and Other Images columns
      .map(column => ({ title: column.title, dataIndex: column.dataIndex, key: column.key }));

    // Add image columns
    for (let i = 0; i <= 10; i++) {
      excelColumns.push({ title: `Image ${i + 1}`, dataIndex: `image_${i}`, key: `image_${i}` });
    }

    // Add data source
    const excelDataSource = data.map(product => {
      const rowData = {
        key: product._id,
        addRemove: product.url.new ? 'new' : product.url.deleted ? 'deleted' : '',
        url: product.url.url,
        ...product
      };
      rowData.date = moment(product.url.updatedAt).format("YYYY-MM-DD");

      // Populate image data for each image column
      for (let i = 0; i <= 10; i++) {
        if (product.imageUrls[i]) {
          rowData[`image_${i}`] = product.imageUrls[i];
        } else {
          rowData[`image_${i}`] = ''; // Populate empty string if no image available
        }
      }

      return rowData;
    });

    // Add data to the Excel instance
    excel.addSheet(current).addColumns(excelColumns).addDataSource(excelDataSource, { str2Percent: true });

    // Save the Excel file
    excel.saveAs(`${current}.xlsx`);
  };
  
  const changeFilter = (filter) => {
    let filteredData = originData;
    if (filter === "new") {
      filteredData = originData.filter(element => element.url.new === true);
      if (filteredData.length === 0) {
        setNoDataMessage(`No new products since the last scrape on ${finalScrapingDate}`)
      }
    } else if (filter === "deleted") {
      filteredData = originData.filter(element => element.url.deleted === true);
      if (filteredData.length === 0) {
        setNoDataMessage(`No removed products since the last scrape on ${finalScrapingDate}`)
      }
    } else if (filter === "all") {
      filteredData = originData;
      if (filteredData.length === 0) {
        setNoDataMessage(`No products that scraped`)
      }
    }
    setPagination(prevPagination => ({
      ...prevPagination,
      current: 1, // Reset pagination to the first page
      total: filteredData.length // Update total count based on filtered data length
    }));
    setData(filteredData);
  }
  const handleDateRangeChange = (dates) => {
    if (!dates || dates.length !== 2) {
      setData(originData);
      return;
    }

    const [start, end] = dates;

    const startDate = start.startOf('day').toDate();
    const endDate = end.endOf('day').toDate();

    const filtered = originData.filter((item) => {
      const itemDate = moment(item.url.updatedAt).toDate();
      return itemDate >= startDate && itemDate <= endDate;
    });
    if (filtered.length === 0) {
      setNoDataMessage(`No Products that matched in Date Picker`)
    }

    setPagination(prevPagination => ({
      ...prevPagination,
      current: 1,
      total: filtered.length
    }));
    setData(filtered);
  };


  const handleSearch = (e) => {
    let filteredData = originData;
    const value = e.target.value.toLowerCase();
    const filtered = filteredData.filter((item) =>
      item.productSku.toLowerCase().includes(value) ||
      item.productName.toLowerCase().includes(value)
    );
    if (filtered.length === 0) {
      setNoDataMessage(`No Products that searched`)
    }

    setPagination(prevPagination => ({
      ...prevPagination,
      current: 1, // Reset pagination to the first page
      total: filtered.length // Update total count based on filtered data length
    }));
    setData(filtered);
  };
  const [messageApi, contextHolder] = message.useMessage();

  const info = () => {
    messageApi.info({
      content: "Please wait while we process it. You will be notified once it's completed",
      className: 'custom-class',
      style: {
        marginTop: '10vh',
      },
      duration: 5,
    });
  };
  const success = (msg) => {
    messageApi.open({
      type: 'success',
      content: msg,
      duration: 5,
      style: {
        marginTop: '10vh'
      }
    });
  };
  const [modal2Open, setModal2Open] = useState(false);
  const historyShow = () => {
    const historyData = [];
    for (let i = 0; i < history.length; i++) {
      const scrapingDate = moment(history[i].createdAt).format("YYYY-MM-DD");
      const addedData = originData.filter((item) => {
        const itemDate = moment(item.url.updatedAt).format("YYYY-MM-DD");
        return itemDate === scrapingDate
      })
      const deletedData = originData.filter((item) => {
        const itemDate = moment(item.url.updatedAt).format("YYYY-MM-DD")
        return itemDate === scrapingDate
      })
      const addedAccount = addedData.filter((item) => {
        return (item.url.new === true) && item.url.deleted === false;
      }).length;
      const deletedAccount = deletedData.filter((item) => {
        return item.url.deleted === true
      }).length;
      historyData.push({ scrapingDate, addedAccount, deletedAccount });
    }
    setModalData(historyData);
  }
  const modalControl = () => {
    setModal2Open(true);
    historyShow()
  }
  return (
    <>
      {
        contextHolder
      }
      <div style={{ position: "fixed", zIndex: "100", top: "64px", padding: "0px 20px", justifyContent: "space-between", backgroundColor: "white", display: "flex", width: "87vw" }}>
        <div style={{ display: "flex" }}>
          <div>
            <Select
              disabled={loading}
              defaultValue="all"
              style={{ width: 120 }}
              onChange={(filter) => changeFilter(filter)}
              options={[
                { value: 'new', label: 'New' },
                { value: 'deleted', label: 'Deleted' },
                { value: 'all', label: 'All' },
              ]}
            />
            <Input
              disabled={loading}
              placeholder="Search Name or SKU"
              onChange={handleSearch}
              style={{ width: 200 }}
            />
          </div>

          <div>
            <RangePicker onChange={handleDateRangeChange} style={{ width: 250 }} disabled={loading} />
          </div>

        </div>
        <div>
          <Button type='primary' disabled={loading} onClick={handleDownloadClick}>Download to Excel</Button>
          <Button type='primary' disabled={loading} style={{ margin: "0px 10px", width: 130 }} onClick={handleStartScraping}>Start Scraping</Button>
          {/* <Button type='primary' disabled={loading} danger style={{ margin: "10px" }} onClick={formatData}>Delete Data</Button> */}
          <Button type="primary" onClick={modalControl} disabled={loading}>
            Scraping History
          </Button>
          <Modal
            title={`History that scrape in ${current} page`}
            centered
            footer="Please use DatePicker Filter Function to see more detail product information"

            open={modal2Open}
            onOk={() => setModal2Open(false)}
            onCancel={() => setModal2Open(false)}
          >
            <Table
              dataSource={modalData}
              key="2"
              columns={[
                { title: 'Scraping Date', dataIndex: 'scrapingDate', key: 'scrapingDate', align: "center" },
                { title: 'Added Amount', dataIndex: 'addedAccount', key: 'addedAccount', align: "center" },
                { title: 'Deleted Amount', dataIndex: 'deletedAccount', key: 'deletedAccount', align: "center" },
              ]}
              pagination={false} // Disable pagination if all data fits in the modal
            />
          </Modal>
        </div>

      </div>
      <Table
        style={{ margin: "15px" }}
        key="1"
        ref={tableRef}
        loading={loading}
        columns={columns}
        bordered
        dataSource={data.map(product => ({ ...product, date: product.url.updatedAt, url: product.url.url, key: product._id, addRemove: product.url.new ? 'new' : product.url.deleted ? 'deleted' : '' }))}
        pagination={{
          ...pagination,
          onChange: handleChange
        }}
        locale={{
          emptyText: noDataMessage
        }}
      />
    </>
  )
};

export default MainTable;