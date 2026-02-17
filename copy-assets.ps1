$src = "C:\2025 Transfer\Work\Coaching Constellations\2. Notion Language Layouts\Graphics\Notion Workspace Surrealty Graphics\Surreality Chapter 1 and 2\Language Layouts Template Graphics"
$dst = "C:\Claude\LanguageLayouts\public\images"

# Template cards
Copy-Item "$src\Language Learning Planner.png" "$dst\language-learning-planner.png"
Copy-Item "$src\Lesson Planner.png" "$dst\lesson-planner.png"
Copy-Item "$src\Action Research.png" "$dst\action-research.png"
Copy-Item "$src\Vocab Builder.png" "$dst\vocab-builder.png"
Copy-Item "$src\Language Learner plus.jpeg" "$dst\language-learner-plus.jpeg"
Copy-Item "$src\Lesson Planner Plus.jpeg" "$dst\lesson-planner-plus.jpeg"
Copy-Item "$src\Online Language Teacher.png" "$dst\online-language-teacher.png"
Copy-Item "$src\memory.png" "$dst\memory.png"
Copy-Item "$src\Language Agent Personalisation.png" "$dst\language-agent-personalisation.png"
Copy-Item "$src\AI Language Learner.png" "$dst\ai-language-learner.png"

# Architect photo
Copy-Item "$src\Profile Language Layouts Reboot.jpeg" "$dst\architect-photo.jpeg"

# Sounds Familiar illustrations
Copy-Item "$src\Creative Design _ astronaut, floating, space, doodle, Vector illustration.png" "$dst\learner-illustration.png"
Copy-Item "$src\Tech and Innovation _ robot, tangled, problem solving, complicated situation.png" "$dst\teacher-illustration.png"

# Beyond Templates / Services
Copy-Item "$src\communication _ hand, high five, gesture, compatible, compatibility, device, electronics.png" "$dst\coaching-illustration.png"
Copy-Item "$src\food _ drink, beverage, coffee, mug, swim, swimming, dive, caffeine, break.png" "$dst\deep-dive-illustration.png"
Copy-Item "$src\Creative Design _ labyrinth, struggle, obstacle, solution, Vector illustration.png" "$dst\space-transformation-illustration.png"

# Smarter not Harder
Copy-Item "$src\Achievement and Success _ mouse character, laser beam, achievement, success, celebration.png" "$dst\smarter-illustration.png"

# Hero video
Copy-Item "$src\Firefly 1. No zoom in. 2. Image is static except for globe moving in a circle 3.  no background 9705 (1).mp4" "$dst\hero-animation.mp4"

Write-Output "All assets copied successfully!"
