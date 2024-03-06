'use client'
import Button from '@/components/buttons/button'
import React, { useState } from 'react'
import { Alert } from '@/lib/types/alert'
import Alerter from '@/components/alerts/alerter'
import { useUserContext } from '@/context/UserContext'
import { useDebounce } from '@uidotdev/usehooks'
import Portfolio from '@/lib/types/portfolio/portfolio'
import createUserSkill from '@/lib/endpoints/skill/create-user-skill'
import Combobox, { ComboBoxOptions } from '../combobox/combobox'
import useSkillsSearchQuery from '@/lib/query/skills/useSkillsSearchQuery'
import SkillPill from '../skills/skill-pill'
import Skill from '@/lib/types/skills/skill'
import updateUserSkill from '@/lib/endpoints/skill/update-user-skills'

interface FormProps {
    onSuccessfullSubmit?: () => void
    Cancel?: React.ReactNode
    portfolioId?: Portfolio['id']
    skills?: Skill[]
}

export default function SkillForm({ onSuccessfullSubmit, Cancel, portfolioId, skills }: FormProps) {
    const { user } = useUserContext()

    const [searchSkill, setSearchSkill] = useState<string>('')
    const debouncedSearchSkill = useDebounce(searchSkill, 500)

    const [skillsToAdd, setSkillsToAdd] = useState<Skill[]>(skills || [])

    const { data: defaultSkills = [] } = useSkillsSearchQuery()

    const { data: searchedSkills = defaultSkills } = useSkillsSearchQuery({
        params: {
            skillSet: debouncedSearchSkill === '' ? undefined : searchSkill,
        },
        enabled: Boolean(debouncedSearchSkill),
    })

    const filterSkills = debouncedSearchSkill === '' ? defaultSkills : searchedSkills

    const options: ComboBoxOptions = filterSkills
        .filter((skill) => !skillsToAdd.includes(skill))
        .map((skill) => {
            return {
                value: skill.skillSet,
                label: skill.skillSet,
            }
        })

    const [alert, setAlert] = useState<Alert>()

    const submitFunction = skills ? updateSubmit : createSubmit

    function addToSkills(skill: string) {
        const skillToAdd = filterSkills.find((s) => s.skillSet.toUpperCase() === skill.toUpperCase())
        setSkillsToAdd([...skillsToAdd, skillToAdd!])
    }

    async function createSubmit() {
        try {
            const res = await createUserSkill({
                userId: user!.id,
                skillSets: [...skillsToAdd.map((s) => s.id)],
                portfolios: portfolioId ? [portfolioId] : undefined,
            })

            if (res.status !== 201) {
                throw new Error('Something went wrong')
                return
            }
            onSuccessfullSubmit && onSuccessfullSubmit()
        } catch {
            setAlert({
                show: true,
                type: 'danger',
                message: 'Looks like something went wrong. Please try again.',
            })
        }
    }

    async function updateSubmit() {
        try {
            const res = await updateUserSkill({
                userId: user!.id,
                skillSets: [...skillsToAdd.map((s) => s.id)],
                portfolios: portfolioId ? [portfolioId] : undefined,
            })

            if (res.status !== 201) {
                throw new Error('Something went wrong')
                return
            }
            onSuccessfullSubmit && onSuccessfullSubmit()
        } catch {
            setAlert({
                show: true,
                type: 'danger',
                message: 'Looks like something went wrong. Please try again.',
            })
        }
    }

    return (
        <>
            <Alerter
                alert={alert}
                className="mt-4"
            />
            <div className="space-y-4">
                <div>
                    <p className="mb-1 text-sm font-semibold">Search</p>
                    <Combobox
                        value={''}
                        options={options}
                        onChange={addToSkills}
                        onSearchChange={setSearchSkill}
                    />
                </div>
                {skillsToAdd.length > 0 && (
                    <div className="w-full">
                        <p className="mb-1 text-sm font-semibold">Skills</p>
                        <div className="flex flex-wrap gap-2">
                            {skillsToAdd.map((skill, index) => (
                                <SkillPill
                                    key={`${index}-${skill}`}
                                    closeIcon
                                    onClick={() => setSkillsToAdd(skillsToAdd.filter((s) => s !== skill))}
                                >
                                    {skill.skillSet}
                                </SkillPill>
                            ))}
                        </div>
                    </div>
                )}
                <div className="flex justify-end gap-2">
                    {Cancel && Cancel}
                    <Button
                        type="submit"
                        loadingText="Saving..."
                        onClick={submitFunction}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </>
    )
}
