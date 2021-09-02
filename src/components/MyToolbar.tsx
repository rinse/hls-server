import {createStyles, IconButton, Link, Toolbar, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import clsx from 'clsx'
import React from 'react'

const useStyles = makeStyles((theme) => createStyles({
    toolbar: {
        paddingRight: theme.spacing(3),
    },
    menuButton: {
        marginRight: theme.spacing(4),
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
}))

interface MyToolbarProps {
    onMenuClick: () => void
    isDrawerOpen: boolean
}

function MyToolbar(props: MyToolbarProps) {
    const classes = useStyles()
    const {onMenuClick, isDrawerOpen} = props
    return (
        <Toolbar className={classes.toolbar}>
            <IconButton edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={onMenuClick}
                        className={clsx(classes.menuButton, isDrawerOpen && classes.menuButtonHidden)}>
                <MenuIcon/>
            </IconButton>
            <Typography variant='h6' className={classes.title}>
                <Link href='/' color='inherit' underline='none'>HLS</Link>
            </Typography>
        </Toolbar>
    )
}

export default MyToolbar