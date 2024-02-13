import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { EllipsisDropdownMenu } from '@/components/dropdown/ellipsis-dropdown'
import { Pencil, Trash2 } from 'lucide-react'
import AddExperienceModal from '@/components/modals/add-experience-modal'

export default function ExperienceCardDropdown() {
    return (
        <EllipsisDropdownMenu>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Trash2 className="mr-2 text-destructive" size={16} />
                        <span className="text-destructive">Delete</span>
                    </DropdownMenuItem>
                    <AddExperienceModal
                        trigger={
                            <DropdownMenuItem>
                                <Pencil className="mr-2" size={16} />
                                <span>Edit</span>
                            </DropdownMenuItem>
                        }
                        triggerClassName="w-full"
                    />
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </EllipsisDropdownMenu>
    )
}
