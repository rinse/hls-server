import {makeStyles} from "@material-ui/core/styles";
import {createStyles, Divider, IconButton} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import React, {PropsWithChildren} from "react";

const useStyles = makeStyles((theme) => createStyles({
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(1),
        ...theme.mixins.toolbar,
    },
}))

interface DrawerContentProps {
    onDrawerClose: () => void
}

function DrawerContent(props: PropsWithChildren<DrawerContentProps>) {
    const classes = useStyles()
    const {onDrawerClose, children} = props
    return (
        <>
            <div className={classes.toolbarIcon}>
                <IconButton onClick={onDrawerClose}>
                    <ChevronLeftIcon/>
                </IconButton>
            </div>
            <Divider/>
            {children}
            <Divider/>
        </>
    )
}

export default DrawerContent
