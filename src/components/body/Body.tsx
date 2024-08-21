import React, { useEffect } from "react";
import { Main, Select, SelectContainer, SelectLabel, Option, Input, ConvertedValue, ConvertedValueContainer, FromToContainer, ConvertionError } from "./Styles";
import LoadingIcons from 'react-loading-icons';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/root-reducer";
import { Dispatch } from "redux";
import { fetchConversionTypes, fetchFromUnits, fetchToUnits, fetchConversion, setSelectedFromUnit, setSelectedToUnit, setActualType, setInputValue } from "../../redux/Converter/converter-slice";

export const Body: React.FC = () => {
    const dispatch = useDispatch<Dispatch<any>>();
    const {
        fromUnits,
        toUnits,
        conversionTypes,
        convertedValue,
        selectedFromUnit,
        selectedToUnit,
        actualType,
        loadingConversion,
        error,
        inputValue
    } = useSelector((state: RootState) => state.converterReducer);

    useEffect(() => {
        dispatch(fetchConversionTypes());
    }, [dispatch]);

    useEffect(() => {
        if (actualType) {
            dispatch(fetchFromUnits(actualType));
        }
    }, [actualType, dispatch]);

    useEffect(() => {
        if (selectedFromUnit) {
            dispatch(fetchToUnits({ fromUnit: selectedFromUnit, type: actualType! }));
        }
    }, [selectedFromUnit, actualType, dispatch]);

    return (
        <Main>
            <SelectContainer>
                <SelectLabel htmlFor="conversion-types">Conversion types:</SelectLabel>
                <Select
                    id="conversion-types"
                    value={actualType || ''}
                    onChange={(e) => {
                        dispatch(setActualType(e.target.value));
                    }}
                >
                    {conversionTypes?.data.map((type: string, index: number) => (
                        <Option key={index} value={type}>{type.toUpperCase().replace("_", " ")}</Option>
                    ))}
                </Select>
            </SelectContainer>

            <FromToContainer>
                <SelectContainer>
                    <SelectLabel htmlFor="from-units">From:</SelectLabel>
                    <Select
                        id="from-units"
                        value={selectedFromUnit || ''}
                        onChange={(e) => {
                            dispatch(setSelectedFromUnit(e.target.value));
                            if (inputValue) {
                                dispatch(fetchConversion({ value: inputValue, fromUnit: e.target.value, toUnit: selectedToUnit!, type: actualType! }));
                            }
                        }}
                    >
                        {fromUnits?.data.map((unit: string, index: number) => (
                            unit !== selectedToUnit ? (
                                <Option key={index} value={unit}>{unit.toUpperCase().replace("_", " ")}</Option>
                            ) : null
                        ))}
                    </Select>
                </SelectContainer>

                <SelectContainer>
                    <SelectLabel htmlFor="to-units">To:</SelectLabel>
                    <Select
                        id="to-units"
                        value={selectedToUnit || ''}
                        onChange={(e) => {
                            dispatch(setSelectedToUnit(e.target.value));
                            if (inputValue) {
                                dispatch(fetchConversion({ value: inputValue, fromUnit: selectedFromUnit!, toUnit: e.target.value, type: actualType! }));
                            }
                        }}
                    >
                        {toUnits?.data.map((unit: string, index: number) => (
                            unit !== selectedFromUnit ? (
                                <Option key={index} value={unit}>{unit.toUpperCase().replace("_", " ")}</Option>
                            ) : null
                        ))}
                    </Select>
                </SelectContainer>
            </FromToContainer>
            <Input type="number" value={inputValue || ''} placeholder={"VALUE IN " + selectedFromUnit?.toUpperCase()} onChange={(e) => {
                const value = parseFloat(e.target.value);
                dispatch(setInputValue(value));
                if (value) {
                    dispatch(fetchConversion({ value, fromUnit: selectedFromUnit!, toUnit: selectedToUnit!, type: actualType! }));
                }
            }
            } />
            <ConvertedValueContainer>
                {loadingConversion ? (
                    <LoadingIcons.SpinningCircles />
                ) : (
                    error ? (
                        <ConvertionError>{convertedValue?.error.message}</ConvertionError>
                    ) : (
                        <ConvertedValue>
                            {convertedValue?.data?.result === undefined || isNaN(parseFloat(convertedValue?.data?.result))
                                ? `0 ${selectedToUnit?.toUpperCase()}`
                                : `${convertedValue?.data?.result} ${selectedToUnit?.toUpperCase()}`}
                        </ConvertedValue>
                    )
                )}
            </ConvertedValueContainer>
        </Main >
    );
};