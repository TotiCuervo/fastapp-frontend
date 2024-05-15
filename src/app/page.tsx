import LandingNavBar from './_components/landing-nav-bar'

export default function Home() {
    return (
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-neutral-950 dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
            <LandingNavBar />
            <div className="flex items-center justify-center pt-40">
                <div className="grid gap-6">
                    <h1 className="text-center text-6xl font-bold">Apply to jobs,</h1>
                    <i className="text-center text-6xl font-bold text-fastapp-500">really, really, fast</i>
                    <p className="text-center">The fastest way to apply for jobs.</p>
                </div>
            </div>
        </div>
    )
}
