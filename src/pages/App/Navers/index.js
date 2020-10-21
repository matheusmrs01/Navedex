import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import api from '../../../services/api';
import EditIcon from '../../../assets/Edit-Icon.png';
import DeleteIcon from '../../../assets/Delete-Icon.png';

import {
    Container,
    ContainerLoading,
    Loading,
    Header,
    ContainerTitle,
    Title,
    AddButton,
    List,
    Naver,
    ContainerImage,
    Avatar,
    Label,
    ContainerOptions,
    Touchable,
    Icon
} from './styles';

export default function Navers({ navigation }) {
    const [loading, setLoading] = useState(true)

    const [navers, setNavers] = useState([])

    //Função que busca os Navers
    async function getNavers() {
        setLoading(true)

        let response
        try {
            response = await api.get('/navers')
        } catch (error) {
            setLoading(false)
            return
        }
        setLoading(false)
        setNavers(response.data)
        return
    }

    //Essa função coloca o header dentro da lista, assim mantendo um efeito de scroll
    function renderHeader() {
        return (
            <Header>
                <ContainerTitle>
                    <Title>Navers</Title>
                </ContainerTitle>

                <AddButton onPress={() => { navigation.navigate('NewNaver') }}>Adicionar naver</AddButton>
            </Header>
        )
    }

    useEffect(() => {
        getNavers()
    }, [])

    return (
        <Container>
            {loading ?
                <ContainerLoading>
                    <Loading size='large' color="#000" />
                </ContainerLoading> :

                <List
                    data={navers}
                    ListHeaderComponent={renderHeader}
                    keyExtractor={naver => String(naver.id)}
                    renderItem={({ item: naver }) => (
                        <Naver>
                            <ContainerImage>
                                <Avatar source={{ uri: naver.url }} resizeMode="contain" />
                            </ContainerImage>
                            <Label isBold>{naver.name}</Label>
                            <Label>{naver.job_role}</Label>
                            <ContainerOptions>
                                <Touchable onPress={() => { }}>
                                    <Icon source={DeleteIcon} resizeMode="contain" />
                                </Touchable>

                                <Touchable onPress={() => { }}>
                                    <Icon source={EditIcon} resizeMode="contain" />
                                </Touchable>
                            </ContainerOptions>
                        </Naver>
                    )}
                />

            }

        </Container>
    );
}
