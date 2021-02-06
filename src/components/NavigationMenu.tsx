import {makeStyles} from '@material-ui/core/styles'
import {AppBar, Button, createStyles, Link, Toolbar, Typography} from '@material-ui/core'
import React from 'react'

const useNavStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: '#20232a',
        },
        title: {
            color: '#ffffff',
            flexGrow: 1,
        },
        element: {
            color: '#ffffff',
        },
        selected: {
            color: '#61dafb',
        },
    }),
)

export default function NavigationMenu() {
    const styles = useNavStyles()
    return (
        <AppBar position='static' classes={{root: styles.root}}>
            <Toolbar>
                <Typography variant='h6' className={styles.title}>
                    <Link href='/' color='inherit' underline='none'>HLS</Link>
                </Typography>
                <Button className={styles.element}>Sample1</Button>
                <Button className={styles.element}>Sample2</Button>
            </Toolbar>
        </AppBar>
    )
}
