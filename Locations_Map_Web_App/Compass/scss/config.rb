# Get the directory that this configuration file exists in
dir = File.dirname(__FILE__)

# Load the sencha-touch framework automatically.
load File.join(dir, '..', 'themes')

# Compass configurations
sass_path    = dir
# Where you would like Compass to output the created css file.
css_path     = File.join(dir, '..', '..','Application','css')
environment  = :production
output_style = :compressed