/**
 * BJJ Technique Lessons
 *
 * These lessons are delivered one at a time after successful focus sessions.
 * Each lesson teaches a concept, technique, or principle from Brazilian Jiu-Jitsu.
 */

export interface BJJLesson {
  id: string
  title: string
  category: 'mindset' | 'strategy' | 'technique'
  content: string
}

/**
 * Complete lesson library for POC
 *
 * Lessons are delivered sequentially - one per completed session.
 * This gives users a sense of progression through the curriculum.
 */
export const BJJ_LESSONS: BJJLesson[] = [
  // MINDSET & LIFESTYLE (5 lessons)
  {
    id: 'mindset-01',
    title: "Don't Roll Just to Win",
    category: 'mindset',
    content: 'As a white belt, it is easy to fall into the trap of measuring success by how many times you tap a training partner. However, you should focus on learning and improving rather than "winning" the round. Many experienced black belts regret spending their early years rolling too hard just for the tap, as it hinders actual skill development. Remember that training is for practice, and "practice doesn\'t count" toward your record.',
  },
  {
    id: 'mindset-02',
    title: 'Practice Patience',
    category: 'mindset',
    content: 'Improvement in Jiu-Jitsu is a slow process that takes years of consistency. You will inevitably face plateaus where it feels like you aren\'t getting better, or even setbacks where you feel you are getting worse. Resilience and the ability to keep showing up during these periods are what separate those who quit from those who eventually reach their goals.',
  },
  {
    id: 'mindset-03',
    title: 'Treat Life Off the Mats Seriously',
    category: 'mindset',
    content: 'Your performance during training is heavily influenced by your lifestyle outside the gym. Paying attention to a healthy diet, ensuring you get adequate sleep, and reducing unhealthy habits like excessive caffeine or alcohol intake will significantly improve your quality of training. Jiu-Jitsu often acts as a catalyst for people to live healthier lives because they want to perform better during live rolling.',
  },
  {
    id: 'mindset-04',
    title: 'Find a "Battle Buddy"',
    category: 'mindset',
    content: 'Having a dedicated training partner who is at a similar level or on a similar schedule can dramatically speed up your progress. A battle buddy provides accountability, helps keep you motivated on days you don\'t want to train, and gives you a consistent partner to sharpen your skills against as you both grow.',
  },
  {
    id: 'mindset-05',
    title: 'Incorporate Strength Training',
    category: 'mindset',
    content: 'Regularly lifting weights, even just twice a week, is critical for injury prevention and general performance on the mats. Building a strong physical foundation helps protect your joints and allows you to execute techniques more effectively. It is one of the most underrated ways for a beginner to improve their longevity in the sport.',
  },

  // STRATEGIC SKILL DEVELOPMENT (5 lessons)
  {
    id: 'strategy-01',
    title: 'Avoid Short-Form Content Overload',
    category: 'strategy',
    content: 'In the age of social media, it is tempting to save dozens of quick technique clips from TikTok or Instagram. However, "overloading" on these short clips often leads to a shallow understanding of the moves. Instead, focus on longer-form instructional content that explains the "why" and the deep mechanics of a move, and stick to a few techniques at a time.',
  },
  {
    id: 'strategy-02',
    title: 'Master a Few Moves Deeply',
    category: 'strategy',
    content: 'You do not need to remember every single technique taught in class to be effective. It is better to choose a handful of moves and master them deeply than to have a vague understanding of a hundred moves. Even legendary practitioners like Roger Gracie reached the highest levels by mastering a few fundamental techniques to an extraordinary degree.',
  },
  {
    id: 'strategy-03',
    title: 'Prioritize Both Passive and Active Drilling',
    category: 'strategy',
    content: 'Drilling is essential for embedding movements into muscle memory. Use passive drilling to learn the mechanics of a move repeatedly without resistance, but don\'t stop there. Incorporate active drilling—situational rolling with specific constraints—to learn how to apply those techniques against a resisting opponent.',
  },
  {
    id: 'strategy-04',
    title: 'Roll with a Clear Focus',
    category: 'strategy',
    content: 'Instead of rolling aimlessly, enter every training session with a specific goal. This could be practicing a particular guard pass you learned that week or focusing exclusively on a specific escape. Having a clear objective prevents you from relying on your "A-game" every time and forces you to develop your weaker areas.',
  },
  {
    id: 'strategy-05',
    title: 'Build Confidence in Submission Escapes',
    category: 'strategy',
    content: 'One of the keys to offensive success is having total confidence in your defensive skills. If you know you can escape most submissions and bad positions, you will feel much more comfortable initiating your own attacks. If your attack fails and you end up in a bad spot, your confidence in your escapes will allow you to stay calm and work your way back to a neutral or dominant position.',
  },

  // POSITIONAL & TECHNICAL FUNDAMENTALS (10 lessons)
  {
    id: 'technique-01',
    title: 'Prioritize Pin Escapes',
    category: 'technique',
    content: 'As a beginner, your first technical priority should be escaping the most common pins, such as side control and mount. You cannot mount an effective offense if you are stuck under someone\'s weight. Furthermore, you should already be thinking about "re-attacks" after you escape, such as transitioning directly into an arm drag or a leg entanglement.',
  },
  {
    id: 'technique-02',
    title: 'Understand Side Control Concepts',
    category: 'technique',
    content: 'Rather than just memorizing specific "bridge and roll" moves, focus on the structural concepts of side control defense. For example, keeping your elbows inside is often enough to begin the escape process. By concaving your body, you create the necessary space to bring your knees back to your elbows to restore your guard.',
  },
  {
    id: 'technique-03',
    title: 'Learn to Stand Up Safely from Closed Guard',
    category: 'technique',
    content: 'Escaping the closed guard is a fundamental skill that many practitioners struggle with even at higher belts. A key trick for standing up safely is to keep your hips positioned under your opponent\'s hips. This alignment makes it significantly harder for the person on the bottom to sweep you or off-balance you as you stand.',
  },
  {
    id: 'technique-04',
    title: 'Start Guard on Your Butt',
    category: 'technique',
    content: 'When playing open guard, starting in a seated position (on your butt) is generally more advantageous than lying flat on your back (supine). A seated guard provides better mobility, easier access to grips, and allows you to transition into various sit-up guards or wrestling up much more easily.',
  },
  {
    id: 'technique-05',
    title: 'Stay Off Your Back to Avoid Being Pinned',
    category: 'technique',
    content: 'When you are playing guard, being pinned flat on your back restricts your mobility and makes it easier for your opponent to control and submit you. To maintain your defensive integrity, try to stay on your side as much as possible. This prevents the guard passer from pinning your shoulders and allows you to move your hips freely.',
  },
  {
    id: 'technique-06',
    title: 'Deny Underhooks at All Costs',
    category: 'technique',
    content: 'Underhooks allow your opponent to control your shoulders and flatten you out, which is a precursor to being pinned. When playing guard, your general rule should be to deny your opponent underhooks. If they do manage to get one, you must prevent them from getting a second underhook or a crossface, which would effectively immobilize you.',
  },
  {
    id: 'technique-07',
    title: 'If in Doubt, Close Your Guard',
    category: 'technique',
    content: 'While open guards offer more offensive variety, the closed guard is the premier defensive position for a beginner. It allows you to control the opponent\'s hips and limits their ability to move or attack you with submissions. If you feel overwhelmed or lost in a transition, closing your guard is an excellent way to slow down the match and reset.',
  },
  {
    id: 'technique-08',
    title: 'Play More Guard to Improve Your Bottom Game',
    category: 'technique',
    content: 'It is common for beginners to avoid playing guard because they don\'t like being on the bottom. However, you should go out of your way to start rolls from the guard. Regularly playing from the bottom forces you to develop the technical skill required to sweep or submit your opponent, which ultimately makes your top game even stronger once you earn the position.',
  },
  {
    id: 'technique-09',
    title: 'Compete to Reveal Your Weaknesses',
    category: 'technique',
    content: 'While not mandatory, competition is a powerful tool for growth. The high-pressure environment of a tournament reveals weaknesses in your game that you might not notice in the relaxed setting of your home gym. It increases your urgency and can help unlock a level of focus and aggression that accelerates your development.',
  },
  {
    id: 'technique-10',
    title: 'Focus on Basics Before Advanced Submissions',
    category: 'technique',
    content: 'While "fancy" moves like heel hooks can be learned safely, white belt classes should primarily focus on the absolute basics: escaping pins, building defensive structures, and a gradual introduction to fundamental submissions. Developing a rock-solid foundation in these areas will serve you much better in the long run than chasing the latest "viral" submission.',
  },
]

/**
 * Get a random lesson
 * (For now - we'll make this sequential later)
 */
export function getRandomLesson(): BJJLesson {
  const randomIndex = Math.floor(Math.random() * BJJ_LESSONS.length)
  return BJJ_LESSONS[randomIndex]
}

/**
 * Get lesson by index (for sequential delivery)
 */
export function getLessonByIndex(index: number): BJJLesson | null {
  if (index < 0 || index >= BJJ_LESSONS.length) {
    return null
  }
  return BJJ_LESSONS[index]
}

/**
 * Get total number of lessons
 */
export function getTotalLessonsCount(): number {
  return BJJ_LESSONS.length
}
