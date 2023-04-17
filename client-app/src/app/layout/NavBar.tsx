import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

interface Props {
    openForm: () => void;
    closeForm: () => void;
}

export default function NavBar({openForm, closeForm}: Props) {

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src='/assets/logo.png' alt='logo' style={{marginRight: 10}} />
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities' />
                <Menu.Item>
                    <Button onClick={openForm} positive content='Create Activity' />
                    <Button onClick={closeForm} positive content='Cancel' />
                </Menu.Item>
            </Container>

        </Menu>
    )
}