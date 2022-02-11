import React, { useEffect, useState } from 'react';
import { Form } from "react-bootstrap";
import { useAsyncDebounce } from 'react-table';
import useTranslation from 'next-translate/useTranslation';

const DataGridCheckBox = ({value: initialValue,  rowIndex: index , columnName: _columnName , updateMyData }) => {

    const { t, lang } = useTranslation();    
    const [value, setValue] = useState(initialValue)
    
    const onChange = value => {   
        let isTrueSet = (value === 'true');        
        setValue(!isTrueSet);
    }   
    
    const onBlur = () => {              
        updateMyData(index, _columnName, value)
    }
    
    useEffect(() => {             
        setValue(initialValue)        
    }, [initialValue]);

    return (
        <>           
            <Form.Check key={index} defaultChecked={value} value={value} onChange={(e) => onChange(e.target.value)} onBlur={ onBlur }  type="checkbox"/>
        </>
    )
}

export default DataGridCheckBox;