import React, { useState, useEffect } from "react";
import { InsertForm } from "./component/index";
import "devextreme/dist/css/dx.light.css";
import {
  DataGrid,
  Column,
  RequiredRule,
  Editing,
  Selection,
  Summary,
  TotalItem,
  GroupPanel,
  Grouping,
  Toolbar,
  Item,
  MasterDetail,
  Export, 
  RemoteOperations,
  Lookup,
  Scrolling, 
  Pager, 
  Paging
} from "devextreme-react/data-grid";

import TextBox from "devextreme-react/text-box";
import DataSource from "devextreme/data/data_source";
import List from "devextreme-react/list";
import Button from "devextreme-react/button";
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Popover } from 'devextreme-react/popover';
import { Workbook } from 'exceljs';
import { Chart, Tooltip } from "devextreme-react/chart";
import Form, { Label, SimpleItem } from "devextreme-react/form";
import LoadIndicator from "devextreme/ui/load_indicator";
import { LoadPanel } from 'devextreme-react/load-panel';
import { ProgressBar } from 'devextreme-react/progress-bar';

import axios from "axios";

const position = { of: '#sale' };

function Sale() {
  const [showId, setShowId] = useState(false);
  const [sale, setSale] = useState([]);
  const [expanded, setExpanded] = useState(true);

  function getFireSale() {
    console.log("getFireSale");  

    axios.get("http://localhost:3000/getFireBirdSale").then((res) => {
      console.log(res.data);
      setSale(res.data);
    });
  }

  return (
    <div>
      <h2>Sale</h2>
      <Button onClick={getFireSale}>매출자료(Sale)데이타가져오기 </Button>

      <DataGrid dataSource={sale} keyExpr={"sa_no"} columnAutoWidth>
        <Grouping autoExpandAll={expanded} />

        <Toolbar>
          <Item name="groupPanel" />
          <Item location="after">
            <Button
              text={expanded ? "접기" : "펼치기"}
              width={100}
              onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
            />
          </Item>          
        </Toolbar>

        <Column dataField="sa_no" visible={false} />
        <Column
          dataField="sa_date"
          width={100}
          alignment="right"
          sortOrder={"asc"}
          fixed={true}
        />
        <Column dataField="sa_cu_name" caption="거래처명" width={200}></Column>

        <Column dataField="sa_typedeal" width={50}></Column>

        <Column
          dataField="sa_pr_item"
          caption="품목명"
          width={100}
          groupIndex={0}
        />
        <Column dataField="sa_qty" caption="수량" format="#,##0" width={50} />
        <Column
          dataField="sa_price"
          caption="단가"
          format="#,##0"
          width={150}
        />
        <Column
          dataField="sa_totalamt"
          caption="매출금액"
          width={200}
          format="#,##0"
          dataType="number"
        />
        <GroupPanel visible={true} />
        <Summary>
          <TotalItem column="sa_cu_name" format="#,##0" summaryType="count" />
          <TotalItem column="sa_totalamt" summaryType="sum" format="#,##0" />
        </Summary>
      </DataGrid>
    </div>
  );
}
export default Sale;
