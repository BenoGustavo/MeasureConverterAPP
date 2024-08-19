import React, { useEffect } from "react";
import { Main, Select, SelectContainer, SelectLabel, Option } from "./Styles";

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

export const Body: React.FC = () => {
    const [fromUnits, setFromUnits] = React.useState<ApiResponse>();
    const [toUnits, setToUnits] = React.useState<ApiResponse>();
    const [convertionType, setConvertionType] = React.useState<ApiResponse>();

    const [SelectedFromUnit, setSelectedFromUnit] = React.useState<string>();
    const [SelectedToUnit, setSelectedToUnit] = React.useState<string>();

    const [ActualType, setActualType] = React.useState<string>();

    let err: boolean = false;
    const jwtToken: string = import.meta.env.VITE_API_JWT_KEY;

    const fetchToUnits = async () => {
        try {
            const toUnitsResponse = await fetch(`http://localhost:8080/api/convert/toUnits?type=${ActualType}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (toUnitsResponse.status !== 200) {
                err = true;
                return
            }

            const result: ApiResponse = await toUnitsResponse.json();
            setToUnits(result);
            setSelectedToUnit(result.data[0]);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const fetchFromUnits = async () => {
        try {
            const fromUnitsResponse = await fetch(`http://localhost:8080/api/convert/fromUnits?type=${ActualType}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (fromUnitsResponse.status !== 200) {
                err = true;
                return
            }

            const result: ApiResponse = await fromUnitsResponse.json();
            setFromUnits(result);
            setSelectedFromUnit(result.data[0]);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchConvertionType = async () => {
        try {
            const ConvertionTypeResponse = await fetch('http://localhost:8080/api/convert/types', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (ConvertionTypeResponse.status !== 200) {
                err = true;
                return
            }

            const result: ApiResponse = await ConvertionTypeResponse.json();
            setConvertionType(result);
            setActualType(result.data[0]);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchConvertionType();
    }, [jwtToken]);

    useEffect(() => {
        if (ActualType) {
            fetchToUnits();
            fetchFromUnits();
        }
    }, [ActualType, jwtToken]);

    return (
        <Main>
            <SelectContainer>
                <SelectLabel htmlFor="conversion-types">Conversion types:</SelectLabel>
                <Select
                    id="conversion-types"
                    onChange={(e) => setActualType(e.target.value)}
                >
                    {convertionType?.data.map((type, index) => (
                        <Option key={index} value={type}>{type.toUpperCase().replace("_", " ")}</Option>
                    ))}
                </Select>
            </SelectContainer>

            <SelectContainer>
                <SelectLabel htmlFor="from-units">From:</SelectLabel>
                <Select
                    id="from-units"
                    onChange={(e) => setSelectedFromUnit(e.target.value)}
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
                    onChange={(e) => setSelectedToUnit(e.target.value)}
                >
                    {toUnits?.data.map((unit, index) => (
                        unit !== SelectedFromUnit ? (
                            <option key={index} value={unit}>{unit.toUpperCase().replace("_", " ")}</option>
                        ) : null
                    ))}
                </Select>
            </SelectContainer>
        </Main>
    )
};