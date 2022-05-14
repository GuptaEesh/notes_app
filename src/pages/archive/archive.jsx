import React from 'react'
import { NoteCard } from '../../components';
import { useData } from '../../helpers/context'

const Archive = () => {
    const {data:{pinnedNotes,unPinnedNotes},loader}=useData();
    const archivedData=[...pinnedNotes,...unPinnedNotes].filter(note=>note.isArchived);
  return (
    !loader && <div className="flex flex-[5] text-primary flex-col pt-2 px-5 gap-8 pb-2 bg-bgColor">
    <h2 className="text-center text-heading font-bold text-2xl">
      Archived Notes
    </h2>
    <div className="grid grid-cols-1 text-heading md:grid-cols-2 lg:grid-cols-3 gap-2">
      {archivedData.length
        ? archivedData.map((note) => <NoteCard key={note._id} note={note} />)
        :"No archived notes as of now" }
    </div>
  </div>
  )
}

export {Archive}
