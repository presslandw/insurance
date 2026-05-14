local wezterm = require 'wezterm'
local schemes = wezterm.get_builtin_color_schemes()
for name, _ in pairs(schemes) do
    if name:find("Synth") then
        print(name)
    end
end
