import { Button, Space, Switch, Table, Tag, Transfer } from 'antd';
import difference from 'lodash/difference';
import { useEffect, useState } from 'react';
import { useGetTeamsQuery } from '../../redux/component/api/teams.api';
import { IconButton } from '@mui/material';
import ShuffleIcon from '@mui/icons-material/Shuffle';

// Customize Table Transfer
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
  <Transfer  {...restProps} locale={{searchPlaceholder:'Поиск команды...', selectAll:'Все', selectInvert:'Все, кроме выбранных', titles:['Все','Выбранные'], itemsUnit:'Команд', itemUnit:'Команд' }}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
      footer,
    }) => {
      const columns = direction === 'left' ? leftColumns : rightColumns;
      
      const rowSelection = {
        getCheckboxProps: (item) => ({
          disabled: listDisabled || item.disabled,
        }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter((item) => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys, selected);
        },
        onSelect({ key }, selected) {
          onItemSelect(key, selected);
        },
        selectedRowKeys:  listSelectedKeys,
      };
      return (
        <Table 
          locale={{emptyText:"Команды не были выбраны", filterEmptyText:'Поиск...', }}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          loading={restProps.loading}
          size="small"
          style={{
            pointerEvents: listDisabled ? 'none' : undefined,
          }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              onItemSelect(key, !listSelectedKeys.includes(key));
            },
          })}
        />
      );
    }}
  </Transfer>
);

const leftTableColumns = [
  {
    dataIndex: 'name',
    title: 'Название' ,
  }
];
const rightTableColumns = [
  {
    dataIndex: 'name',
    title: () => (
      <span>
        Название
      </span>
    ),
  },
];

export function TransferTableList ({...props}) {
  const [targetKeys, setTargetKeys] = useState([]);
  const {data, isLoading, isError, isSuccess} = useGetTeamsQuery();
  const [dataSource, setDataSource] = useState([]);

  const onChange = (nextTargetKeys,direction, moveKeys) => {
    setTargetKeys(nextTargetKeys);

    if(direction==='right') {
      
      const selectedKeys = nextTargetKeys.filter((key) => {
        return dataSource.some((item) => item.key === key);
      });

      props.handleSelectedTeams(selectedKeys)
    };

    if(direction === 'left'){
      props.clearSelectedTeams(moveKeys);
    }
  };

  useEffect(()=>{
    if(!data) {
      setDataSource([]);
      setTargetKeys([]);
      return;
    };

    setTargetKeys(data.map(i=> ({key: i.idTeam})));
    setDataSource(data.map(i=> ({...i, key: i.idTeam})));
  }, [data])

  return (
      <TableTransfer
        //selectedTeams={props.handleSelectedTeams}
        dataSource={dataSource}
        targetKeys={targetKeys}
        loading={isLoading}
        //disabled={disabled}
        showSearch
        onChange={onChange}
        
        filterOption={(inputValue, item) =>
          item.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1 //|| item.tag.indexOf(inputValue) !== -1
        }
        
        leftColumns={leftTableColumns}
        rightColumns={rightTableColumns}
      />
  );
};

export default TransferTableList;