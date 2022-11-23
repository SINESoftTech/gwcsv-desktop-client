import React, {useEffect, useState} from 'react'
import {Button, Stack} from '@mui/material'
import {PlaylistAddCheck, ReadMore} from '@mui/icons-material'
import PropTypes from 'prop-types'
import {electronActions} from '../../../react/Context'
import {getJsonRawData} from '../../../react/Actions/electionActions'
import {IdentifiedEvidenceColumnDefinitions} from '../../../react/Components/ColumnDefinitions'
import GwMapper, {EVIDENCE_TYPE} from '../../../react/Mapper/gw_mapper'
import EvidenceListTable from '../../../core/ui/EvidenceListTable'
import {validData} from "../../../react/Valid/valid";
import {getPeriod, getTxtPeriod} from "../../../react/Util/Time";


//todo validation
const validEvidence = (evidenceObj, businessEntityTaxId, assignMap) => Object.keys(evidenceObj)
    .map((id, idx) => {
        const obj = evidenceObj[id]
        const data = validData(
            businessEntityTaxId,
            GwMapper.toView(obj, id, idx + 1),
            assignMap,
        );

        return data
    })

function IdentifiedEvidenceListTable(props) {
    const {
        data, declareProperties, assignMap, onResultAllConfirmed,
        onViewImage, OnDeleteEvidence, onGetIdentifyResult
    } = props
    const [rowData, setRowData] = useState([])
    const [localFiles, setLocalFiles] = useState(data)
    const [selectionModel, setSelectionModel] = React.useState([])

    useEffect(() => {
        const init = async () => {
            // const assignMap = await getAssign()
            // setAssignMap(assignMap)
            setLocalFiles(data)
            if (Object.keys(data).length > 0) {
                let result = validEvidence(data['03'], declareProperties.clientTaxId, assignMap)
                result = result.sort((a, b) => {
                    const createDate1 = a.createDate
                    const createDate2 = b.createDate
                    if (createDate1 <= createDate2) {
                        return 1
                    }
                    return 0
                });

                setRowData(result)
            }
        }
        init()
    }, [assignMap, data, declareProperties.clientTaxId])

    const handleResultAllConfirmed = async () => {
        const errorIdList = rowData.filter((obj) => obj.cellHighlight.length > 0).map((obj) => obj.id)
        const filterIdList = Object.keys(localFiles['03'])
            .filter((key) => {
                const ticketId = localFiles['03'][key].id.result
                return selectionModel.includes(ticketId)
            }).filter((key) => {
                const ticketId = localFiles['03'][key].id.result
                return !errorIdList.includes(ticketId)
            })

        console.log(filterIdList)
        const result = await onResultAllConfirmed(declareProperties.clientTaxId, filterIdList)
        setLocalFiles(result)
        const validResult = validEvidence(result['03'], declareProperties.clientTaxId, assignMap)
        setRowData(validResult)
    }

    const handleSelection = (newSelectionModel) => setSelectionModel(newSelectionModel)

    const handleEditRow = async (editData, field = '') => {
        const jsonData = await getJsonRawData(editData.id, declareProperties.clientTaxId)
        console.log('handleEditRow', field)
        console.log('jsonData', jsonData)
        jsonData[field].result = editData[field]
        if (field === 'evidenceType') {
            const key = jsonData[field].result
            jsonData[field].result = EVIDENCE_TYPE[key]
        }
        if (field === 'evidenceDate') {
            jsonData['period'].result = getTxtPeriod(editData[field]) + ''
        }
        // const validatingData = validData(declareProperties.clientTaxId, SigoutourMapper.toView(jsonData, jsonData.ticketId.result, 1), assignMap).cellHighlight
        const result = await electronActions.updateData(declareProperties.clientTaxId, jsonData)
        const validResult = validEvidence(result['03'], declareProperties.clientTaxId, assignMap)
        setLocalFiles(result)
        setRowData(validResult)
    }

    const handleOpenImage = async (fullPath) => {
        console.log(fullPath)
        onViewImage({
            'fullPath': fullPath
        })
    }

    const handleDelete = async (id) => {
        await OnDeleteEvidence(declareProperties.clientTaxId, '03', id)
    }

    // const [selected, setSelected] = React.useState([])
    // const handleClick = (event, name) => {
    //     const selectedIndex = selected.indexOf(name)
    //     let newSelected = []
    //
    //     if (selectedIndex === -1) {
    //         newSelected = newSelected.concat(selected, name)
    //     } else if (selectedIndex === 0) {
    //         newSelected = newSelected.concat(selected.slice(1))
    //     } else if (selectedIndex === selected.length - 1) {
    //         newSelected = newSelected.concat(selected.slice(0, -1))
    //     } else if (selectedIndex > 0) {
    //         newSelected = newSelected.concat(
    //             selected.slice(0, selectedIndex),
    //             selected.slice(selectedIndex + 1)
    //         )
    //     }
    //
    //     setSelected(newSelected)
    // }

    return (
        <>
            <Stack direction='row' spacing={2} mb={2}>
                <Button
                    variant='contained'
                    startIcon={<ReadMore/>}
                    disableElevation='true'
                    onClick={(e) => onGetIdentifyResult(e, localFiles['02'])}
                >
                    取得辨識結果
                </Button>
                <Button
                    variant='contained'
                    startIcon={<PlaylistAddCheck/>}
                    disableElevation='true'
                    onClick={handleResultAllConfirmed}
                >
                    確認辨識結果
                </Button>
            </Stack>
            <EvidenceListTable data={rowData} checkboxSelection={true}
                               handleSelection={handleSelection}
                               handleEditRow={handleEditRow}
                               handleOpenImage={handleOpenImage}
                               columns={IdentifiedEvidenceColumnDefinitions}
                               handleDelete={handleDelete}/>
        </>
    )
}

IdentifiedEvidenceListTable.propTypes = {
    data: PropTypes.any,
    declareProperties: PropTypes.any,
    OnDeleteEvidence: PropTypes.func,
    onViewImage: PropTypes.func,
    onGetIdentifyResult: PropTypes.func,
    assignMap: PropTypes.any,
    onResultAllConfirmed: PropTypes.func
}

export default IdentifiedEvidenceListTable
