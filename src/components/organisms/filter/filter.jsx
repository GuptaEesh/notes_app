import { useFilter } from '../../../helpers/context'
import { Button } from '../../atomic/button/button'
import { Radio } from '../../index'
import {
    resetFilters,
    latestToOldHandler,
    oldToLatestHandler,
    priorityHandler
} from './filter-controller'
import { FilterHolder } from './filter-holder'
export function Filter() {
    const { filters, dispatchFilter } = useFilter()
    const priorityArray=[{title:"Utmost Prior",priority:1},{title:"Somewhat Prior",priority:2},{title:"Least Prior",priority:3}]
    return (
        <div className="flex gap-1 justify-around flex-wrap bg-light_background">     
            <FilterHolder legendName="Date Sort">
                <Radio
                    radioName="date"
                    radioText="Latest Date"
                    checkStatus={filters.sortByDate === 'LATEST_TO_OLD'}
                    inputFunc={() => latestToOldHandler(dispatchFilter)}
                />
                <Radio
                    radioName="date"
                    radioText="Oldest Date"
                    checkStatus={filters.sortByDate === 'OLD_TO_LATEST'}
                    inputFunc={() => oldToLatestHandler(dispatchFilter)}
                />
            </FilterHolder>
            <FilterHolder legendName="Priority Sort">
                {priorityArray.map(({title,priority})=><Radio
                    radioName="priority"
                    radioText={title}
                    checkStatus={filters.priority === priority}
                    inputFunc={() => priorityHandler(priority,dispatchFilter)}
                />)}
            </FilterHolder>
            <Button btnText="Clear Filters" btnType="m-1 font-bold rounded p-1 bg-primary text-secondary" btnFunc={() => resetFilters(dispatchFilter)} />
        </div>
    )
}