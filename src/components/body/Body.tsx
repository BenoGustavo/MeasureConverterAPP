import React, { useEffect } from "react";
import { Main, Select, SelectContainer, SelectLabel, Option, Input, ConvertedValue, ConvertedValueContainer, FromToContainer, ConvertionError } from "./Styles";
import LoadingIcons from 'react-loading-icons'

interface ApiResponse {
    status: number;
    result: string;
    error: {
        code: number;
        message: string;
        description: string;
    } | null;
    data: string[];
}

interface ConvertionApiResponse {
    status: number,
    result: string,
    error: {
        code: number,
        message: string,
        description: string
    },
    data: {
        fromUnit: string,
        toUnit: string,
        factor: number,
        type: string,
        result: string
    }
}

export const Body: React.FC = () => {
    const [fromUnits, setFromUnits] = React.useState<ApiResponse>();
    const [toUnits, setToUnits] = React.useState<ApiResponse>();
    const [convertionType, setConvertionType] = React.useState<ApiResponse>();

    const [convertedValue, setConvertedValue] = React.useState<ConvertionApiResponse>();

    const [SelectedFromUnit, setSelectedFromUnit] = React.useState<string>();
    const [SelectedToUnit, setSelectedToUnit] = React.useState<string>();

    const [ActualType, setActualType] = React.useState<string>();

    const [loading, setLoading] = React.useState<boolean>(false);
    const [loadingConversion, setLoadingConversion] = React.useState<boolean>(false);

    const [err, setErr] = React.useState<boolean>(false);

    const [inputValue, setInputValue] = React.useState<number>();

    const jwtToken: string = import.meta.env.VITE_API_JWT_KEY;

    const fetchToUnits = async () => {
        setLoading(true);
        try {
            const toUnitsResponse = await fetch(`http://localhost:8080/api/convert/toUnits?fromUnits=${SelectedFromUnit}&type=${ActualType}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (toUnitsResponse.status !== 200) {
                setErr(true);
            } else {
                setErr(false);
            }

            const result: ApiResponse = await toUnitsResponse.json();

            console.log(result, `http://localhost:8080/api/convert/toUnits?fromUnits=${SelectedFromUnit}&type=${ActualType}`)

            setToUnits(result);
            setSelectedToUnit(result.data[1]);

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchFromUnits = async () => {
        setLoading(true);
        try {
            const fromUnitsResponse = await fetch(`http://localhost:8080/api/convert/fromUnits?type=${ActualType}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (fromUnitsResponse.status !== 200) {
                setErr(true);
            } else {
                setErr(false);
            }

            const result: ApiResponse = await fromUnitsResponse.json();
            setFromUnits(result);
            setSelectedFromUnit(result.data[0]);

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchConvertionType = async () => {
        setLoading(true);
        try {
            const ConvertionTypeResponse = await fetch('http://localhost:8080/api/convert/types', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (ConvertionTypeResponse.status !== 200) {
                setErr(true);
            } else {
                setErr(false);
            }

            const result: ApiResponse = await ConvertionTypeResponse.json();
            setConvertionType(result);
            setActualType(result.data[0]);

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchConvertion = async (number: number) => {
        setLoadingConversion(true);
        try {
            const ConvertionResponse = await fetch(`http://localhost:8080/api/convert?value=${number}&fromUnit=${SelectedFromUnit}&toUnit=${SelectedToUnit}&type=${ActualType}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (ConvertionResponse.status !== 200) {
                setErr(true);
            } else {
                setErr(false);
            }

            const result: ConvertionApiResponse = await ConvertionResponse.json();
            setConvertedValue(result);

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoadingConversion(false);
        }
    };

    useEffect(() => {
        fetchConvertionType();
    }, [jwtToken]);

    useEffect(() => {
        if (ActualType) {
            fetchFromUnits();
        }
    }, [ActualType, jwtToken]);

    useEffect(() => {
        if (SelectedFromUnit) {
            fetchToUnits();
        }
    }, [SelectedFromUnit, ActualType, jwtToken]);

    return (
        <Main>
            {loading ? (
                <LoadingIcons.Circles />
            ) : (
                <>
                    <SelectContainer>
                        <SelectLabel htmlFor="conversion-types">Conversion types:</SelectLabel>
                        <Select
                            id="conversion-types"
                            value={ActualType}
                            onChange={(e) => {
                                setActualType(e.target.value);
                                setSelectedFromUnit(undefined);
                                setSelectedToUnit(undefined);
                                setFromUnits(undefined);
                                setToUnits(undefined);
                                setConvertedValue(undefined);
                                setInputValue(undefined);
                            }}
                        >
                            {convertionType?.data.map((type, index) => (
                                <Option key={index} value={type}>{type.toUpperCase().replace("_", " ")}</Option>
                            ))}
                        </Select>
                    </SelectContainer>

                    <FromToContainer>
                        <SelectContainer>
                            <SelectLabel htmlFor="from-units">From:</SelectLabel>
                            <Select
                                id="from-units"
                                value={SelectedFromUnit}
                                onChange={(e) => {
                                    setSelectedFromUnit(e.target.value);
                                    setInputValue(undefined);
                                    inputValue ? fetchConvertion(inputValue) : null;
                                }}
                            >
                                {fromUnits?.data.map((unit, index) => (
                                    unit !== SelectedToUnit ? (
                                        <Option key={index} value={unit}>{unit.toUpperCase().replace("_", " ")}</Option>
                                    ) : null
                                ))}
                            </Select>
                        </SelectContainer>

                        <SelectContainer>
                            <SelectLabel htmlFor="to-units">To:</SelectLabel>
                            <Select
                                id="to-units"
                                value={SelectedToUnit}
                                onChange={(e) => {
                                    setSelectedToUnit(e.target.value);
                                    setInputValue(undefined);
                                    inputValue ? fetchConvertion(inputValue) : null;
                                }}
                            >
                                {toUnits?.data.map((unit, index) => (
                                    unit !== SelectedFromUnit ? (
                                        <Option key={index} value={unit}>{unit.toUpperCase().replace("_", " ")}</Option>
                                    ) : null
                                ))}
                            </Select>
                        </SelectContainer>
                    </FromToContainer>
                    <Input type="number" value={inputValue || ''} placeholder={"VALUE IN " + SelectedFromUnit?.toUpperCase()} onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        setInputValue(value);
                        value ? fetchConvertion(value) : null;
                    }
                    } />
                    <ConvertedValueContainer>
                        {loadingConversion ? (
                            <LoadingIcons.SpinningCircles />
                        ) : (
                            err ? (
                                <ConvertionError>{convertedValue?.error.message}</ConvertionError>
                            ) : (
                                <ConvertedValue>
                                    {convertedValue?.data?.result === undefined || isNaN(parseFloat(convertedValue?.data?.result))
                                        ? `0 ${SelectedToUnit?.toUpperCase()}`
                                        : `${convertedValue?.data?.result} ${SelectedToUnit?.toUpperCase()}`}
                                </ConvertedValue>
                            )
                        )}
                    </ConvertedValueContainer>
                </>
            )}
        </Main>
    );
};